import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import BottomTabs from './app/navigation/BottomTabs';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import LoginScreen from './app/screens/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import Recommend from './app/navigation/Recommend';

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
      <Stack.Navigator initialRouteName='Recommend' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Recommend' component={Recommend} />
        {/* <Stack.Screen name='BottomTabs' component={BottomTabs} /> */}
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
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
