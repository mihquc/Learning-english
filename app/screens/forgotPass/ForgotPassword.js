import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useNavigationService from '../../navigation/NavigationService'

import Loader from '../../components/Load/loader'

import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [messageValid, setMessageValid] = useState('')
    const [loading, setLoading] = useState(false)
    const { navigate, goBack } = useNavigationService()
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);
    const handleForgotPassword = () => {
        axios.post(`${baseURL}/users/forgotPassword`, {
            email: email
        }).then(res => {
            console.log(res.data)
            if (res.data?.success) {
                navigate('ResetPassword', { email })
                setLoading(false);
            }
        }).catch(err => {
            console.log(err.response?.data)
            setMessageValid("Email is not registered")
            setLoading(false);
        })
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : ''}
        >
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={{ width: '85%', height: '40%', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image
                        source={require('../../../assets/forgot.png')}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>
                        Enter the email address to get an OTP code to reset your password
                    </Text>
                </View>
                <View style={styles.viewInput}>
                    <Image
                        source={require('../../../assets/mail.png')}
                        style={{ width: 25, height: 25, tintColor: 'gray' }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            setEmail(text)
                            setMessageValid('')
                        }}
                        autoCorrect={false}
                    />
                </View>
                {messageValid &&
                    <View style={styles.viewValid}>
                        <Text style={styles.textValid}>{messageValid}</Text>
                    </View>
                }
                <View style={{ width: '100%', alignItems: 'center', height: '20%', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={[styles.buttonBottom,
                    {
                        backgroundColor: isEmailValid ? '#f2c601' : '#BBBBBB',
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 3.5,
                        elevation: 3
                    }]}
                        onPress={() => {
                            setLoading(true)
                            handleForgotPassword()
                        }}
                        disabled={!isEmailValid}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
                            Send Code
                        </Text>
                    </TouchableOpacity>
                </View>
                {loading && <Loader indeterminate={loading} />}
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword

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
    },
    input: {
        width: '80%',
        height: '100%',
    },
    textValid: {
        color: 'red',
        // textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    viewValid: {
        width: '85%',
        height: '3%',
        justifyContent: 'center',
    },
})