import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DaysList({ weather, onDaySelect }: any) {
  // Grouper par jour
  const groupByDay = () => {
    const grouped: any = {};
    weather.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  const groupedDays = groupByDay();

  // Obtenir nom du jour
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  // Obtenir min/max temp pour un jour
  const getMinMaxTemp = (dayForecasts: any[]) => {
    const temps = dayForecasts.map(f => f.main.temp);
    return {
      min: Math.round(Math.min(...temps)),
      max: Math.round(Math.max(...temps))
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prévisions 5 jours</Text>
      
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedDays).map(([date, forecasts]: any) => {
          const { min, max } = getMinMaxTemp(forecasts);
          const mainWeather = forecasts[0]; // Première prévision du jour
          
          return (
            <TouchableOpacity 
              key={date} 
              style={styles.dayItem}
              onPress={() => onDaySelect(date)}
            >
              <View style={styles.dayInfo}>
                <Text style={styles.dayName}>{getDayName(mainWeather.dt_txt)}</Text>
                <Text style={styles.dayDesc}>{mainWeather.weather[0].description}</Text>
              </View>
              
              <Image 
                source={{ uri: `https://openweathermap.org/img/wn/${mainWeather.weather[0].icon}.png` }}
                style={styles.icon}
              />
              
              <View style={styles.tempContainer}>
                <Text style={styles.tempMax}>{max}°</Text>
                <Text style={styles.tempMin}>{min}°</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  dayItem: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  dayDesc: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 15,
  },
  tempContainer: {
    alignItems: 'flex-end',
  },
  tempMax: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  tempMin: {
    fontSize: 14,
    color: '#999',
  },
}); 