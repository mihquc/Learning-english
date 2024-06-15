import React, { useLayoutEffect, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeBar from '../components/header/HomeBar';

import i18n from '../i18n';
import ProfileScreen from '../screens/profile';
import Settings from '../screens/settings';
import BackBar from '../components/BackBar';
import Info from '../screens/info';
import NewPassword from '../screens/forgotPass/NewPassword';


const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const height = Dimensions.get('window').height;

const SettingsNavigator = () => {
    const [animationTypeForReplace, setAnimationTypeForReplace] = useState('push');
    return (
        <HomeStack.Navigator initialRouteName="Settings" headerMode="screen">
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    animationTypeForReplace,
                    headerShown: true,
                    header: () => <BackBar isIconBack />,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="Info"
                component={Info}
                options={{
                    animationTypeForReplace,
                    headerShown: true,
                    gestureEnabled: false,
                    header: () => <BackBar isIconBack />
                }}
            />
            <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{
                    animationTypeForReplace,
                    headerShown: true,
                    gestureEnabled: false,
                    header: () => <BackBar isIconBack />
                }}
            />
        </HomeStack.Navigator>
    );
};

export default SettingsNavigator;
