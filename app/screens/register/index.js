import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ButtonCustom from '../../components/button/ButtonCustom'
import useNavigationService from '../../navigation/NavigationService'

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
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [hide, setHide] = useState(true)
    const [isPress, setIsPress] = useState(false);
    const { navigate, goBack, goPop } = useNavigationService();
    return (
        <SafeAreaView style={localStyles.container}>
            <View style={{ width: '85%', height: '60%', justifyContent: 'space-evenly', }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ borderWidth: 0.5, padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Sign up to create your own account!</Text>
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
                        placeholder='User name'
                        keyboardType='default'
                        value={email}
                    />
                </View>
                <View style={localStyles.inputContainer}>
                    <Image source={require('../../../assets/mail.png')} style={localStyles.icon} />
                    <TextInput
                        style={localStyles.input}
                        placeholder='Email'
                        keyboardType='email-address'
                        value={email}
                    />
                </View>
                <View style={localStyles.inputContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Image source={require('../../../assets/lock.png')} style={localStyles.icon} />
                        <TextInput
                            style={localStyles.input}
                            placeholder='Password'
                            secureTextEntry={hide ? true : false}
                            value={password}
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
                backgroundColor: isPress ? '#f2c601' : '#e5e5e5',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 3.5,
                elevation: 3
            }]}
                disabled={!isPress}
                onPress={() => navigate('EnglishLevel', {})}
            >
                <Text style={{ fontSize: 17, fontWeight: '500', color: isPress ? 'black' : 'gray' }}>Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    }
})
