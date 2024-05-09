import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Hello from '../screens/recommend/hello';
import ChooseLanguage from '../screens/recommend/chooseLanguage';

const Stack = createNativeStackNavigator();
const Recommend = () => {
    return (
        <Stack.Navigator initialRouteName='Hello'>
            <Stack.Screen
                name="Hello"
                component={Hello}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="ChooseLanguage"
                component={ChooseLanguage}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            {/* <Stack.Screen /> */}
        </Stack.Navigator>
    )
}

export default Recommend

const styles = StyleSheet.create({})