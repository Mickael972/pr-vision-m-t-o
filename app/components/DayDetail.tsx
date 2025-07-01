import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DayDetail({ weather, selectedDay, onGoBack }: any) {
  // Filtrer les prévisions pour le jour sélectionné
  const dayForecasts = weather.list.filter((item: any) => 
    item.dt_txt.startsWith(selectedDay)
  );

  // Obtenir nom du jour
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  // Obtenir l'heure
  const getTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={styles.container}>
      {/* Header avec bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.dayTitle}>{getDayName(dayForecasts[0].dt_txt)}</Text>
      </View>

      {/* Liste des prévisions 3h */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {dayForecasts.map((item: any, index: any) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.time}>{getTime(item.dt_txt)}</Text>
            
            <Image 
              source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
              style={styles.icon}
            />
            
            <View style={styles.info}>
              <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
              <Text style={styles.description}>{item.weather[0].description}</Text>
            </View>
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
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  list: {
    flex: 1,
  },
  forecastItem: {
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
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 60,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 15,
  },
  info: {
    flex: 1,
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
}); 