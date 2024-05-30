import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import BottomTabs from './app/navigation/BottomTabs';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './app/navigation/AuthNavigatior';
import Settings from './app/screens/settings';
import BackBar from './app/components/BackBar';
import SettingsNavigator from './app/navigation/SettingsNavigator';

export default function App() {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setloading(true)
    }, 2000);
  }, [])
  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={loading}
      logoImage={require('./assets/logo.png')}
      backgroundColor={"#FFEBCD"}
      logoHeight={200}
      logoWidth={200}
    >
      <Tab />
    </AnimatedSplash>
  );
}
const Stack = createNativeStackNavigator();
const Tab = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomTabs' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='BottomTabs' component={BottomTabs} />
        <Stack.Screen name='AuthNavigator' component={AuthNavigator} />
        <Stack.Screen
          name='SettingsNavigator'
          component={SettingsNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
