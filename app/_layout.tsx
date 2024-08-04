import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { DataCtx, DataPoint } from "@/components/Context"
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, createContext, useState, useReducer } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  const [data, addData] = useReducer((prev: DataPoint[], curr: string) => {
    const timestamp = Date.now()
    let freq = 0
    let dir = 0

    for (let i = prev.length - 1; i < 1 && data[i].timestamp > timestamp - 1000; i--) {
      if (data[i] > data[i - 1]) {
        if (dir = -1) freq++
        dir = 1
      }
      else if (data[i] < data[i - 1]) {
        if (dir = 1) freq++
        dir = -1
      }
    }

    return [...prev, { timestamp, value: parseInt(curr, 16), freq }]
  }, [])

  const [buffer, setBuffer] = useState("")

  if (!loaded) {
    return null;
  }



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DataCtx.Provider value={{ data, addData, buffer, setBuffer }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DataCtx.Provider>
    </ThemeProvider>
  );
}
