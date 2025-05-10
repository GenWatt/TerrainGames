import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import Colors from '@/constants/Colors';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouterStore } from '@/features/shared/stores/routerStore';
import { queryClient } from '@/features/shared/utils/queryClient';
import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
  const { setCurrentPath } = useRouterStore();
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <QueryClientProvider client={queryClient}>
            <KeyboardProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                <Stack.Screen name="auth/register" options={{ headerShown: false }} />
                <Stack.Screen name="(modals)/createTripModal" options={{ presentation: 'card', headerShown: false }} />
                <Stack.Screen name="(modals)/waypointModal" options={{ presentation: 'card', headerShown: false }} />
              </Stack>
            </KeyboardProvider>
          </QueryClientProvider>
          <Toast />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
