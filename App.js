import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import BottomTabs from './app/navigation/BottomTabs';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './app/navigation/AuthNavigatior';
import SettingsNavigator from './app/navigation/SettingsNavigator';
import GameScreen from './app/screens/games';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import ProgressPlay from './app/components/Load/progressBarPlay';
import CompleteGame from './app/components/complete/CompleteGame';
import Mistakes from './app/components/mistakes';

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
      logoImage={require('./assets/Logo.png')}
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AuthNavigator' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ gestureEnabled: false }} />
          <Stack.Screen name='AuthNavigator' component={AuthNavigator} />
          <Stack.Screen
            name='SettingsNavigator'
            component={SettingsNavigator}
          />
          <Stack.Screen
            name='GameScreen'
            component={GameScreen}
          />
          <Stack.Screen
            name='ProgressPlay'
            component={ProgressPlay}
          />
          <Stack.Screen
            name='CompleteGame'
            component={CompleteGame}
          />
          <Stack.Screen
            name='Mistakes'
            component={Mistakes}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
