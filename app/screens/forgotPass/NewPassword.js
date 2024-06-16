import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Platform, Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useNavigationService from '../../navigation/NavigationService'
import axios from 'axios'
import baseURL from '../../services/api/baseURL'
import { useRoute } from '@react-navigation/native'

import Loader from '../../components/Load/loader';

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [loading, setLoading] = useState(false)
    const route = useRoute()
    const email = route.params?.email;
    const routeName = route.params?.name;
    // console.log(routeName)
    const { navigate, goBack } = useNavigationService()
    const newPassword = () => {
        formData = {
            email: email,
            newPassword: password
        }
        axios.post(`${baseURL}/users/resetPassword`, formData, {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('response', response.data)
            if (response.data?.success) {
                if (routeName) {
                    navigate('WelcomeBack')
                } else {
                    setModalVisible(true)
                }
                setLoading(false)
            }
        }).catch((error) => {
            // console.error('error:', error.response.data)
            const errorMessages = error.response?.data.map(item => item.description).join('\n');
            Alert.alert('Notification', errorMessages)
            setLoading(false)
        })
    }
    const isValidate = password.length > 0 && password1.length > 0;
    const isMatchPassword = password === password1;
    const [modalVisible, setModalVisible] = useState(false);
    const [hide, setHide] = useState(true)
    const [hide1, setHide1] = useState(true)
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
                        Tạo mật khẩu mới
                    </Text>
                </View>
                <View style={styles.viewInput}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Image source={require('../../../assets/lock.png')} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder='Mật khẩu mới'
                            secureTextEntry={hide ? true : false}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setHide(!hide)}
                        style={{ padding: 2 }}
                    >
                        <Image
                            source={hide ? require('../../../assets/eye-password.png') : require('../../../assets/eye-password-hide.png')}
                            style={{ tintColor: 'gray', width: 25, height: 18 }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewInput}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Image source={require('../../../assets/lock.png')} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder='Nhập lại mật khẩu mới'
                            secureTextEntry={hide1 ? true : false}
                            value={password1}
                            onChangeText={(text) => setPassword1(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setHide1(!hide1)}
                        style={{ padding: 2 }}
                    >
                        <Image
                            source={hide1 ? require('../../../assets/eye-password.png') : require('../../../assets/eye-password-hide.png')}
                            style={{ tintColor: 'gray', width: 25, height: 18 }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                {!isMatchPassword && password1.length > 0 &&
                    <View style={{ width: '85%' }}>
                        <Text style={{ color: 'red', fontWeight: '500' }}>Mật khẩu không trùng khớp!</Text>
                    </View>
                }
                <View style={{ width: '100%', alignItems: 'center', height: '20%', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={[styles.buttonBottom,
                    {
                        backgroundColor: isValidate && isMatchPassword ? '#f2c601' : '#BBBBBB',
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
                            setLoading(true);
                            newPassword()
                        }}
                        disabled={isValidate && isMatchPassword ? false : true}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
                            Lưu thay đổi
                        </Text>
                    </TouchableOpacity>
                </View>
                {loading && <Loader indeterminate={loading} />}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontWeight: '600', fontSize: 15 }}>
                                Cập nhật mật khẩu thành công!
                            </Text>
                            <TouchableOpacity style={styles.button}
                                onPress={() => {
                                    goBack()
                                }}
                            >
                                <Text style={styles.modalText}>
                                    Back
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        fontSize: 15
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        width: '80%',
        height: '32%',
        backgroundColor: '#f2c601',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: 'gray',
        resizeMode: 'contain',
    },
})