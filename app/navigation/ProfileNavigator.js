import React, { useLayoutEffect, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeBar from '../components/header/HomeBar';

import i18n from '../i18n';
import ProfileScreen from '../screens/profile';
import Settings from '../screens/settings';
import BackBar from '../components/BackBar';


const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const height = Dimensions.get('window').height;

const ProfileNavigator = () => {
    const [animationTypeForReplace, setAnimationTypeForReplace] = useState('push');
    return (
        <HomeStack.Navigator initialRouteName="ProfileScreen" headerMode="screen">
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    animationTypeForReplace,
                    header: (props) => <HomeBar />,
                    gestureEnabled: false,
                }}
            />
            {/* <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    animationTypeForReplace,
                    headerShown: true,
                    gestureEnabled: false,
                    header: () => <BackBar isIconBack />
                }}
            /> */}
        </HomeStack.Navigator>
    );
};

export default ProfileNavigator;
