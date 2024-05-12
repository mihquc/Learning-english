import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Platform } from 'react-native'
import React from 'react'

const LoginScreen = () => {
    const localStyles = React.useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
            },
            inputContainer: {
                borderRadius: 10,
                backgroundColor: '#FAFAFA',
                paddingVertical: Platform.OS === 'android' ? 10 : 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 1
            },
            icon: {
                width: 20,
                height: 20,
                tintColor: 'gray',
                resizeMode: 'contain',
                borderWidth: 1
            },
            input: {
                borderWidth: 1,
                width: '85%',
                padding: 4,
                fontSize: 16,
                fontWeight: '400'
            }
        }), [])
    return (
        <SafeAreaView style={localStyles.container}>
            <View>
                <Image source={require('../../../assets/lionlv.png')} />
            </View>
            <View style={{ width: '85%', height: '30%', justifyContent: 'space-evenly' }}>
                <View style={localStyles.inputContainer}>
                    <Image source={require('../../../assets/mail.png')} style={localStyles.icon} />
                    <TextInput
                        style={localStyles.input}
                        placeholder='Email'
                    />
                </View>
                <View style={localStyles.inputContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Image source={require('../../../assets/lock.png')} style={localStyles.icon} />
                        <TextInput
                            style={localStyles.input}
                            placeholder='Password'
                        />
                    </View>
                    <Image source={require('../../../assets/lock.png')} style={(localStyles.icon)} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
