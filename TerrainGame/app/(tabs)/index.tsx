import React, { useEffect } from 'react';
import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';
import Mapbox, { MapView } from "@rnmapbox/maps";
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/auth';


Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_API_KEY!);
// Mapbox.setConnected(true);

export default function HomeScreen() {
  const router = useRouter();
  const { data } = useQuery({ queryKey: ['me'], queryFn: getMe });

  const goToLogin = () => {
    router.push({ pathname: "/auth/login", params: {} })
  }

  return (
    <View style={styles.titleContainer}>
      <Text>{JSON.stringify(data?.data)}</Text>
      <Button title="Go to login" onPress={goToLogin} />
      <MapView style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
