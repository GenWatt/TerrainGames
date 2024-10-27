import { StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/auth';
import useError from '@/hooks/useError';
import Map from '@/components/map/Map';

export default function HomeScreen() {
  const { handleError } = useError();
  const { data, error } = useQuery({ queryKey: ['me'], queryFn: getMe, retry: 0 });

  handleError(error);

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
