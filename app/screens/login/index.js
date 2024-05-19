import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ButtonCustom from '../../components/button/ButtonCustom'
import useNavigationService from '../../navigation/NavigationService'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
                position: 'relative',
                // top: Platform.OS === 'android' ? 50 : 70,
                alignItems: 'center',
                borderRadius: 10,
                width: '85%',
                paddingVertical: 17,
                marginTop: 50
            }
        }), [])
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [hide, setHide] = useState(true)
    const { navigate, goBack, goPop } = useNavigationService();
    const [isButtonEnabled, setButtonEnabled] = useState(false);

    const handleEmailChange = (text) => {
        setEmail(text);
        checkButtonState(text, password);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        checkButtonState(email, text);
    };
    const checkButtonState = (emailValue, passwordValue) => {
        if (emailValue?.trim() !== '' && passwordValue?.trim() !== '') {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    };
    return (
        <SafeAreaView style={localStyles.container}>
            <View style={{ width: '85%', height: '45%', justifyContent: 'space-between', }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ borderWidth: 0.5, padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Please log in to learn together!</Text>
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
                        <Image source={require('../../../assets/mail.png')} style={localStyles.icon} />
                        <TextInput
                            style={localStyles.input}
                            placeholder='Email'
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
                                placeholder='Password'
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
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'purple' }}>Forgot password ?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[localStyles.buttonBottom,
            {
                backgroundColor: isButtonEnabled ? '#f2c601' : '#e5e5e5',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 3.5,
                elevation: 3
            }]}
                disabled={!isButtonEnabled}
                onPress={() => navigate('BottomTabs', {})}
            >
                <Text style={{ fontSize: 17, fontWeight: '500', color: isButtonEnabled ? 'black' : 'gray' }}>
                    Sign In
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    }
})
