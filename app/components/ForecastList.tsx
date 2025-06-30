import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ForecastList({ weather }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prévisions 5 jours</Text>
      
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {weather.list.map((item: any, index: any) => (
          <View key={index} style={styles.item}>
            <Text style={styles.date}>{item.dt_txt}</Text>
            <Image 
              source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
              style={styles.icon}
            />
            <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
            <Text style={styles.description}>{item.weather[0].description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  date: {
    flex: 1,
    fontSize: 12,
    color: '#666',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  temp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    width: 50,
  },
  description: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
}); 