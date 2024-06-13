import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useNavigationService from '../../navigation/NavigationService';
import axios from 'axios';
import baseURL from '../../services/api/baseURL';
import { useRoute } from '@react-navigation/native';

const ResetPassword = () => {
    const route = useRoute();
    const email = route.params?.email;
    console.log(email);
    const { navigate } = useNavigationService()
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text.length === 1 && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputs.current[index - 1].focus();
        }
    };

    const otpString = otp.join('');
    console.log(otpString);
    const isOtpComplete = otpString.length === 6;

    const handleSubmit = () => {
        const formData = {
            email: email,
            otp: otpString
        }
        axios.post(`${baseURL}/users/verifyOtp`, formData, {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log('response', response.data);
                if (response.data.success === true) {
                    navigate('NewPassword', { email: email })
                }
            }).catch((err) => {
                console.log('err', err);
            });
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : ''}
        >
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={{ width: '85%', height: '40%', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image
                        source={require('../../../assets/send.png')}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>
                        Enter the email address to get an OTP code to reset your password
                    </Text>
                </View>
                <View style={styles.viewInput}>
                    {otp.map((value, index) => (
                        <TextInput
                            key={index}
                            value={value}
                            onChangeText={text => handleChange(text, index)}
                            onKeyPress={e => handleKeyPress(e, index)}
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={1}
                            ref={ref => (inputs.current[index] = ref)}
                        />
                    ))}
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
                        onPress={() => { handleSubmit() }}
                        disabled={!isOtpComplete}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default ResetPassword

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
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        margin: 5,
        fontSize: 18,
        borderRadius: 5
    },
})