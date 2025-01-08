import { SplashScreen, Stack } from "expo-router";

import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GlobalProvider } from "@/lib/global-provider";

export default function RootLayout() {
  const [fontLoaded] = useFonts(  {
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-SemiLight": require('../assets/fonts/Rubik-Bold.ttf'),

  }) 

  useEffect( () => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </GlobalProvider>
  );
}
