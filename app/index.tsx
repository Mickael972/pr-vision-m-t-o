import { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

import * as Device from 'expo-device';

import * as Location from 'expo-location';


interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'erreur'
        );
        setLoading(false);
        return;
      }
      
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        await fetchWeather(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        setErrorMsg('Erreur');
      } finally {
        setLoading(false);
      }
    }

    getCurrentLocation();
  }, []);

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const API_KEY = 'b3e4be45a9322d71144190141c6a3779';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`;
      
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setErrorMsg('Erreur');
    }
  };

  if (weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.cityName}>{weather.name}</Text>
        <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.description}>{weather.weather[0].description}</Text>
        <Image 
          source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
          style={styles.weatherIcon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
