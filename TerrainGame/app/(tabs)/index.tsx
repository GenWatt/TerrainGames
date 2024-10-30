import { StyleSheet, View } from 'react-native';
import Map from '@/features/map/components/Map';

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
