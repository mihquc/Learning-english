import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useNavigationService from '../../navigation/NavigationService'

const NewPassword = () => {
    const [email, setEmail] = useState('')
    const { navigate, goBack } = useNavigationService()
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : ''}
        >
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={{ width: '85%', height: '40%', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image
                        source={require('../../../assets/newpass.png')}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>
                        Enter the email address to get an OTP code to reset your password
                    </Text>
                </View>
                <View style={styles.viewInput}>
                    <Image
                        source={require('../../../assets/lock.png')}
                        style={{ width: 25, height: 25, tintColor: 'gray' }}
                        resizeMode='contain'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New password"
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.viewInput}>
                    <Image
                        source={require('../../../assets/lock.png')}
                        style={{ width: 25, height: 25, tintColor: 'gray' }}
                        resizeMode='contain'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New password"
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        autoCorrect={false}
                    />
                </View>
                <View style={{ width: '100%', alignItems: 'center', height: '20%', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={[styles.buttonBottom,
                    {
                        backgroundColor: '#f2c601',
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 3.5,
                        elevation: 3
                    }]}
                        onPress={() => navigate('WelcomeBack', {})}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default NewPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBottom: {
        position: 'relative',
        alignItems: 'center',
        borderRadius: 10,
        width: '85%',
        paddingVertical: 17,
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '85%',
        height: '6%',
        borderRadius: 10,
        backgroundColor: '#EEEEEE',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 3,
        marginBottom: 10
    },
    input: {
        width: '80%',
        height: '100%',
    },
})