import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useNavigationService from '../../navigation/NavigationService'

const WelcomeBack = () => {
    const [email, setEmail] = useState('')
    const { navigate, goPopToTop } = useNavigationService()
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : ''}
        >
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={{
                    width: '85%', height: '40%', alignItems: 'center',
                    justifyContent: 'flex-start', justifyContent: 'space-between'
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600', color: '#f2c601' }}>
                        Chào mừng bạn trở lại!
                    </Text>
                    <Image
                        source={require('../../../assets/comback.png')}
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600' }}>
                        Bạn đã tạo mật khẩu mới thành công.
                    </Text>
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
                        onPress={() => goPopToTop()}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default WelcomeBack

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
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '85%',
        height: '6%',
    },
    input: {
        width: '80%',
        height: '100%',
    },
})