import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      // Demander permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission refusée');
        setLoading(false);
        return;
      }

      // Obtenir position
      let location = await Location.getCurrentPositionAsync({});
      
      // Appeler API météo
      const API_KEY = 'b3e4be45a9322d71144190141c6a3779';
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric&lang=fr`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError('Erreur');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.center}>
        <Text>Pas de données</Text>
      </View>
    );
  }

  const current = weather.list[0];

  return (
    <View style={styles.container}>
      {/* Météo actuelle */}
      <View style={styles.current}>
        <Text style={styles.city}>{weather.city.name}</Text>
        <Text style={styles.temp}>{Math.round(current.main.temp)}°C</Text>
        <Text>{current.weather[0].description}</Text>
        <Image 
          source={{ uri: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png` }}
          style={styles.icon}
        />
      </View>

      {/* Prévisions */}
      <Text style={styles.title}>Prévisions 5 jours</Text>
      
      <ScrollView style={styles.list}>
        {weather.list.map((item: any, index: any) => (
          <View key={index} style={styles.item}>
            <Text style={styles.date}>{item.dt_txt}</Text>
            <Image 
              source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
              style={styles.smallIcon}
            />
            <Text>{Math.round(item.main.temp)}°C</Text>
            <Text>{item.weather[0].description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  current: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 36,
    color: 'red',
    fontWeight: 'bold',
  },
  icon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    flex: 1,
    fontSize: 12,
  },
  smallIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
