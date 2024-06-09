import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import useNavigationService from '../../navigation/NavigationService'
import baseURL from '../../services/api/baseURL'
import Loader from '../../components/Load/loader'

const Settings = () => {
    const [progress, setProgress] = useState(false)
    const { navigate, goPopToTop, goPop } = useNavigationService();
    const token = useSelector((state) => state.authReducer.token);
    console.log('token:' + token);
    const logOut = () => {
        axios.post(`${baseURL}/users/signOut`, {}, {
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                console.log('response', response.data)
                if (response.status === 200) {
                    goPopToTop();
                    goPop();
                }
            }).catch((error) => {
                console.error(error)
            })
    }
    const data = [
        {
            name: 'Personal Info',
            img: require('../../../assets/icon_person.png'),
            color: '#c4d5ff',
            onPress: () => {
                navigate('Info', {})
            }
        },
        {
            name: 'Change Password',
            img: require('../../../assets/lock.png'),
            color: '#b8ff97',
            onPress: () => {

            }
        },
        {
            name: 'Log Out',
            img: require('../../../assets/logout.png'),
            color: '#fecacb',
            onPress: async () => {
                setProgress(true)
                await logOut()
            }
        }
    ]
    return (
        <View style={styles.container}>
            {data.map(item =>
            (
                <TouchableOpacity
                    key={item.name}
                    style={{
                        width: '95%', height: '10%', alignItems: 'center',
                        justifyContent: 'space-between', flexDirection: 'row', borderRadius: 15,
                        backgroundColor: item.color, shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.2, shadowColor: '#000000', shadowRadius: 10,
                        elevation: 3, marginBottom: 10
                    }}
                    onPress={item.onPress}
                >
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        width: 'auto', justifyContent: 'flex-start', padding: 15
                    }}>
                        <Image
                            source={item.img}
                            style={{ width: 25, height: 25 }}
                            resizeMode='contain'
                            tintColor='red'
                        />
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '600', paddingHorizontal: 15 }}>{item.name}</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Image
                            source={require('../../../assets/right.png')}
                            style={{ width: 20, height: 20 }}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
            )
            )}
            {progress ? <Loader indeterminate={progress} /> : null}
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
})