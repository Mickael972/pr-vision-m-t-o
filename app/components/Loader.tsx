import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Chargement de la météo...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
}); 