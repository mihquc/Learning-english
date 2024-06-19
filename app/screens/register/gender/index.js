import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useNavigationService from '../../../navigation/NavigationService';
import { useRoute } from '@react-navigation/native';
import baseURL from '../../../services/api/baseURL';
import axios from 'axios';

const GenderScreen = () => {
    const [selectGender, setSelectGender] = useState(true)
    const { navigate, goBack, goPop } = useNavigationService();
    const route = useRoute();
    const token = route.params?.token;
    const [user, setUser] = useState()
    console.log('token:', route.params?.token)
    const getProfile = () => {
        axios.get(`${baseURL}/profiles`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                console.log('response', response.data)
                setUser(response.data)
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
    const updateProfile = () => {
        const data = {
            avatarFilePath: user?.avatarFilePath,
            birthday: user?.birthday,
            sex: selectGender,
            status: user?.status
        }
        axios.put(`${baseURL}/profiles/${user?.id}`, data,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then((response) => {
                console.log('response', response.data)
                if (response.status === 200) {
                    navigate('BirthdayScreen', { token: token, id: user?.id });
                }
            }).catch((error) => console.error('error:', error))
    }
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '40%', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    style={{
                        width: '45%', borderWidth: selectGender ? 5 : 1, height: '60%',
                        borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                        borderColor: selectGender ? '#f2c601' : 'gray'
                    }}
                    onPress={() => setSelectGender(true)}
                >
                    <Image
                        source={require('../../../../assets/male.png')}
                        style={{ width: 150, height: 150 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{
                    width: '45%', borderWidth: selectGender ? 1 : 5, height: '60%',
                    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                    borderColor: selectGender ? 'gray' : '#f2c601'
                }}
                    onPress={() => setSelectGender(false)}
                >
                    <Image
                        source={require('../../../../assets/female.png')}
                        style={{ width: 150, height: 150 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: '20%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    style={{
                        width: '85%',
                        height: '30%',
                        borderRadius: 15, alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#f2c601',
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 3.5,
                        elevation: 3
                    }}
                    onPress={() => updateProfile()}
                >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#FFFFFF' }}>Tiếp tục</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '85%',
                        height: '30%',
                        borderRadius: 15, alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#FFFFFF', borderColor: '#f2c601', borderWidth: 1,
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 3.5,
                        elevation: 3
                    }}
                    onPress={() => navigate('BirthdayScreen', {})}
                >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#f2c601' }}>Bỏ qua</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GenderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})