import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseURL from '../../services/api/baseURL'
import { useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import useNavigationService from '../../navigation/NavigationService'

const Mistakes = () => {
    const { goBack, navigate } = useNavigationService()
    const [topics, setTopics] = useState([])
    const route = useRoute();
    const id = route.params?.id;
    // const token = useSelector((state) => state.authReducer.token);
    // console.log(id)
    // const topic = topics.find((topic) => topic.id === id)

    return (
        <View style={styles.container}>
            <View style={styles.viewBody}>
                <Text style={styles.text}>Cùng sửa những câu bạn đã làm sai nào!</Text>
                <Image
                    source={require('../../../assets/complete.png')}
                />
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        navigate('GameScreen', { reset: true, id: id })
                    }}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600' }}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Mistakes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#302627',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    text: {
        color: '#f2c601',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%'
    },
    button: {
        backgroundColor: '#f2c601',
        alignItems: 'center',
        borderRadius: 15,
        width: '85%',
        paddingVertical: 15,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 3
    },
    viewButton: {
        width: '100%',
        alignItems: 'center',
    },
    viewBody: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})