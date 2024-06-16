import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import useNavigationService from '../../navigation/NavigationService'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux'

import baseURL from '../../services/api/baseURL'
import Loader from '../../components/Load/loader'
import storage from '../../redux/storage'

const LoginScreen = () => {
    const localStyles = React.useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
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
                alignItems: 'center',
                borderRadius: 10,
                width: '85%',
                paddingVertical: 15,
            }
        }), [])
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState('')
    const [hide, setHide] = useState(true)
    const { navigate, goBack, goPop } = useNavigationService();

    const handleUserNameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const isFormValid = username.length > 0 && password.length > 0;

    const [res, setRes] = useState([])
    const setToken = (token) => {
        dispatch({
            type: 'SET_TOKEN',
            token: token
        })
    }
    const signIn = async () => {
        const data = {
            userName: username,
            email: null,
            password: password
        }
        axios.post(`${baseURL}/users/signIn`, data, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain'
            }
        })
            .then((response) => {
                console.log('response', response?.status)
                console.log('response', response.data)
                if (response?.status === 200) {
                    setRes(response?.data)
                    console.log('response', response.data?.token)
                    AsyncStorage.setItem('token', response?.data?.token)
                    setToken(response?.data?.token)
                    console.log('response', response?.data)
                    dispatch({
                        type: 'SET_ACCOUNT',
                        account: response?.data
                    })
                    navigate('BottomTabs', {})
                    setProgress(false)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log('error:', error.response?.data);
                    Alert.alert('Notification', error.response?.data?.message)
                }
                setProgress(false)
            })
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : ''}
        >
            <KeyboardAwareScrollView contentContainerStyle={localStyles.container}
                showsVerticalScrollIndicator={false}>
                <View style={{ width: '85%', height: '60%', justifyContent: 'center', }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, borderColor: '#f2c601' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#f2c601' }}>Hãy đăng nhập để cùng học nhé!</Text>
                        </View>
                        <Image
                            source={require('../../../assets/lion2.png')}
                            style={{ width: 130, height: 130 }}
                            resizeMode='contain'
                        />
                    </View>
                    {/* <KeyboardAwareScrollView
                    contentContainerStyle={{}}
                    showsVerticalScrollIndicator={false}
                    extraScrollHeight={0}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}> */}
                    <View style={{ height: '45%', justifyContent: 'space-around' }}>
                        <View style={localStyles.inputContainer}>
                            <Image source={require('../../../assets/icon_person.png')} style={localStyles.icon} />
                            <TextInput
                                style={localStyles.input}
                                placeholder='Tên tài khoán'
                                keyboardType='default'
                                value={username}
                                onChangeText={handleUserNameChange}
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
                    {/* </KeyboardAwareScrollView> */}
                    <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => navigate('ForgotPassword', {})}
                    >
                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'purple' }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', height: '10%', justifyContent: 'center' }}>
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
                            signIn()
                        }}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '500', color: isFormValid ? 'black' : 'gray' }}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerContent}>Hoặc</Text>
                    <View style={styles.divider} />
                </View>
                <View style={styles.signUpWrapper}>
                    <Text style={{ color: '#f2c601', fontSize: 15, fontWeight: '500' }}>
                        Không có tài khoản?
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#f2c601', padding: 10, borderRadius: 10 }}
                        onPress={() => {
                            goPop();
                            navigate('RegisterScreen', {});
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: 'white'
                            }}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            {progress ? <Loader indeterminate={progress} /> : null}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen
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
