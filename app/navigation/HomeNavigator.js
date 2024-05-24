import React, { useLayoutEffect, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home';
import HomeBar from '../components/header/HomeBar';

import i18n from '../i18n';
import { IosDevice } from '../config/devices';


const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const height = Dimensions.get('window').height;

const HomeNavigator = () => {
    const { colors } = useTheme();
    const [animationTypeForReplace, setAnimationTypeForReplace] = useState('push');
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" headerMode="screen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    animationTypeForReplace,
                    header: (props) => <HomeBar />,
                    gestureEnabled: false,
                }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeNavigator;
