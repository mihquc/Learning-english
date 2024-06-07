import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import useNavigationService from '../navigation/NavigationService';
const BeginScreen = () => {
    const { navigate, goBack, goPop } = useNavigationService();
    const localStyles = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF'
                },
                textHeader: {
                    fontSize: 24,
                    fontWeight: '600',
                    borderWidth: 1,
                    padding: 12,
                    borderRadius: 5,
                },
                button: {
                    alignItems: 'center',
                    borderWidth: 1,
                    width: 300,
                    padding: 17,
                    borderRadius: 20,
                },
                textButton: {
                    fontSize: 20,
                    fontWeight: '700'
                },
                containerBtn: {
                    justifyContent: 'space-between',
                    width: 'auto',
                    height: 140,
                    marginTop: 10
                },
                textBody: {
                    fontSize: 20,
                    fontWeight: '400',
                }
            }),
        [],
    );
    return (
        <View style={localStyles.container}>
            <Text style={localStyles.textHeader}>Hello, I'm Lion</Text>
            <Image source={require('../../assets/liongo.png')} resizeMode='contain' />
            <View style={{ width: '80%', marginVertical: 14 }}>
                <Text style={[localStyles.textBody, { textAlign: 'center' }]}>
                    Learn English whenever and wherever you want. It's free forever.
                </Text>
            </View>
            <View style={localStyles.containerBtn}>
                <TouchableOpacity style={[localStyles.button, {
                    backgroundColor: '#f2c601', borderColor: '#f2c601', shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.5,
                    elevation: 3
                }]}
                    onPress={() => navigate('LoginScreen', {})}
                >
                    <Text style={[localStyles.textButton, { color: '#ffffff' }]}>
                        Sign In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[localStyles.button, { borderColor: '#f2c601' }]}
                    onPress={() => navigate('RegisterScreen', {})}
                >
                    <Text style={[localStyles.textButton, { color: '#f2c601' }]}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BeginScreen
