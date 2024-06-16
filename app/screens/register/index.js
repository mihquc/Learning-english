import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import useNavigationService from '../../navigation/NavigationService'
import baseURL from '../../services/api/baseURL'
import Loader from '../../components/Load/loader'

const RegisterScreen = () => {
    const localStyles = React.useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                justifyContent: 'center'
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
            },
            input: {
                width: '85%',
                padding: 4,
                fontSize: 16,
                fontWeight: '400'
            },
            buttonBottom: {
                position: 'relative',
                alignItems: 'center',
                borderRadius: 10,
                width: '85%',
                paddingVertical: 17,
                marginTop: 20
            }
        }), [])
    const [progress, setProgress] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hide, setHide] = useState(true)
    const [res, setRes] = useState();
    const { navigate, goBack, goPop } = useNavigationService();
    const handleUserNameChange = (text) => {
        setUsername(text);
    };
    const handleEmailChange = (text) => {
        setEmail(text);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const isFormValid = username.length > 0 && email.length > 0 && password.length > 0;
    const createAccount = () => {
        const data = {
            userName: username,
            email: email,
            password: password
        }
        axios.post(`${baseURL}/users/register`, data)
            .then((response) => {
                console.log('response', response.data)
                setRes(response.data)
                if (response.status === 200) {
                    navigate('GenderScreen', { token: response.data?.token })
                    setProgress(false)
                }
            })
            .catch((error) => {
                // console.log('error:', error)
                if (error.response) {
                    // console.log('error:', error.response);
                    const errorMessages = error.response?.data.map(item => item.description).join('\n');
                    Alert.alert('Notification', errorMessages)
                }
                setProgress(false)
            })
    }
    // useEffect(() => {
    //     createAccount();
    // }, [])
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : ''}
        >
            <KeyboardAwareScrollView contentContainerStyle={localStyles.container}
                showsVerticalScrollIndicator={false}>
                <View style={{ width: '85%', height: '60%', justifyContent: 'space-evenly', }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#f2c601' }}>
                                Đăng ký để tạo tài khoản của riêng bạn!
                            </Text>
                        </View>
                        <Image
                            source={require('../../../assets/lion2.png')}
                            style={{ width: 150, height: 150 }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Image source={require('../../../assets/icon_person.png')} style={localStyles.icon} />
                        <TextInput
                            style={localStyles.input}
                            placeholder='Tên tài khoản'
                            keyboardType='default'
                            value={username}
                            onChangeText={handleUserNameChange}
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Image source={require('../../../assets/mail.png')} style={localStyles.icon} />
                        <TextInput
                            style={localStyles.input}
                            placeholder='Địa chỉ email'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={handleEmailChange}
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Image source={require('../../../assets/lock.png')} style={localStyles.icon} />
                            <TextInput
                                style={localStyles.input}
                                placeholder='Mật khẩu'
                                secureTextEntry={hide ? true : false}
                                value={password}
                                onChangeText={handlePasswordChange}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setHide(!hide)}
                            style={{ padding: 2 }}
                        >
                            <Image
                                source={hide ? require('../../../assets/eye-password.png') : require('../../../assets/eye-password-hide.png')}
                                style={{ tintColor: 'gray', width: 25, height: 18 }}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '100%', borderWidth: 0.2, borderColor: '#E6E6E6' }}>

                </View>
                <TouchableOpacity style={[localStyles.buttonBottom,
                {
                    backgroundColor: isFormValid ? '#f2c601' : '#e5e5e5',
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 3.5,
                    elevation: 3
                }]}
                    disabled={!isFormValid}
                    onPress={() => {
                        setProgress(true)
                        createAccount()
                    }}
                >
                    <Text style={{ fontSize: 17, fontWeight: '500', color: isFormValid ? 'black' : 'gray' }}>
                        Đăng ký </Text>
                </TouchableOpacity>
                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerContent}>Hoặc</Text>
                    <View style={styles.divider} />
                </View>
                <View style={styles.signUpWrapper}>
                    <Text style={{ color: '#f2c601', fontSize: 15, fontWeight: '500' }}>
                        Đã có tài khoản?
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#f2c601', padding: 10, borderRadius: 10 }}
                        onPress={() => {
                            goPop();
                            navigate('LoginScreen', {});
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: 'white'
                            }}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView >
            {progress ? <Loader indeterminate={progress} /> : null}
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen
const styles = StyleSheet.create({
    buttonBottom: {
        position: 'relative',
        // top: Platform.OS === 'android' ? 100 : 150,
        alignItems: 'center',
        borderRadius: 10,
        width: '85%',
        paddingVertical: 17,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginHorizontal: 20
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#686868',
        marginHorizontal: 5
    },
    dividerContent: {
        color: '#f2c601',
        fontSize: 17,
        lineHeight: 18,
        marginHorizontal: 10
    },
    signUpWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 12,
        width: '60%',
    }
})
