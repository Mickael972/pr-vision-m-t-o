import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Importer composants
import CurrentWeather from './components/CurrentWeather';
import DayDetail from './components/DayDetail';
import DaysList from './components/DaysList';
import Loader from './components/Loader';

export default function App() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

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
      setError('Erreur de connexion');
      setLoading(false);
    }
  };

  // Fonctions pour navigation
  const selectDay = (day: string) => {
    setSelectedDay(day);
  };

  const goBack = () => {
    setSelectedDay(null);
  };

  // Afficher le loader pendant le chargement
  if (loading) {
    return <Loader />;
  }

  // Afficher l'erreur
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Pas de données
  if (!weather) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aucune donnée disponible</Text>
      </View>
    );
  }

  // Afficher l'app météo
  return (
    <View style={styles.container}>
      <CurrentWeather weather={weather} />
      
      {selectedDay ? (
        <DayDetail 
          weather={weather} 
          selectedDay={selectedDay} 
          onGoBack={goBack}
        />
      ) : (
        <DaysList 
          weather={weather} 
          onDaySelect={selectDay}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
  },
});
