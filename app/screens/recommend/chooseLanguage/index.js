import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChooseLanguage = () => {
    const localStyles = React.useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },

        }), [])
    return (
        <View style={localStyles.container}>
            <Text>ChooseLanguage</Text>
        </View>
    )
}

export default ChooseLanguage
