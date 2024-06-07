import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const Loader = ({ indeterminate }) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 1 }]}>
            <Progress.Circle color='#f2c601' borderWidth={5} size={40} indeterminate={indeterminate} />
        </View>
    )
}

const styles = StyleSheet.create({})

export default Loader;