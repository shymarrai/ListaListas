import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import Principal from './src/screens/Principal';

import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';


import theme_light from './src/global/styles/theme'
import theme_dark from './src/global/styles/theme_dark'

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand'

import { 
  Lobster_400Regular 
} from '@expo-google-fonts/lobster'


export default function App() {
  const [ changedTheme, setChangedTheme ] = useState(false)

  
  function toggleTheme(){
    setChangedTheme(!changedTheme)
  }
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_400Regular,
    Lobster_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={changedTheme ? theme_dark : theme_light}>
        <StatusBar barStyle="default" />
        <Principal toggleTheme={toggleTheme} />
      </ThemeProvider>
    );
  }
}

