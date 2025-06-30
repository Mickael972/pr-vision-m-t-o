import { Image, StyleSheet, Text, View } from 'react-native';

export default function CurrentWeather({ weather }: any) {
  const current = weather.list[0];

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.city.name}</Text>
      <Text style={styles.temp}>{Math.round(current.main.temp)}°C</Text>
      <Text style={styles.description}>{current.weather[0].description}</Text>
      <Image 
        source={{ uri: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png` }}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  temp: {
    fontSize: 48,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  icon: {
    width: 80,
    height: 80,
  },
}); 