import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseURL from '../../services/api/baseURL'
import { useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import useNavigationService from '../../navigation/NavigationService'

const CompleteGame = () => {
    const { navigate, goPopMultiple } = useNavigationService()
    const [topics, setTopics] = useState([])
    const route = useRoute();
    const id = route.params?.id;
    const token = useSelector((state) => state.authReducer.token);
    console.log(id)
    const getAllTopic = () => {
        axios.get(`${baseURL}/topics`, {
            headers: {
                'Authorization': 'bearer ' + token,
            }
        })
            .then((response) => {
                console.log('data', response.data?.topics)
                setTopics(response.data?.topics)
            })
            .catch((error) => console.error(error))
    }
    const topic = topics.find((topic) => topic.id === id)
    console.log(topic)
    useEffect(() => {
        getAllTopic()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.viewBody}>
                <Text style={styles.text}>Bạn đã hoàn thành chủ đề {topic?.name}</Text>
                <Text style={styles.text}>Số câu chính xác: {topic?.numberOfPlayedGames} / {topic?.numberOfGame}</Text>
                <Image
                    source={require('../../../assets/complete.png')}
                />
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        goPopMultiple(3)
                    }}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '600' }}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CompleteGame

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