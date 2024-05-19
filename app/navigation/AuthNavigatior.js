import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './NavigationLogin';
import RegisterScreen from './NavigationRegister';
import BeginScreen from '../screens/BeginSceen';
import GenderScreen from '../screens/register/gender';
import BirthdayScreen from '../screens/register/birthday';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {

    return (
        <Stack.Navigator initialRouteName="BeginScreen">
            <Stack.Screen
                name="BeginScreen"
                component={BeginScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
