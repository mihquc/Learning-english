import {
    FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import axios from 'axios';

import useNavigationService from '../../navigation/NavigationService';
import baseURL from '../../services/api/baseURL';
import { useSelector, useDispatch } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const HomeScreen = () => {
    const [topics, setTopics] = useState([])
    const [fetchData, setFetchData] = useState([])

    const dispatch = useDispatch()
    const [user, setUser] = useState([])

    const { navigate } = useNavigationService();
    const token = useSelector((state) => state.authReducer.token);
    console.log('token: ' + token);

    const getProfile = () => {
        axios.get(`${baseURL}/profiles`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                console.log('response', response.data)
                setUser(response.data)
                dispatch({
                    type: 'SET_USER',
                    user: response.data
                })
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const getAllTopic = () => {
        axios.get(`${baseURL}/topics`, {
            headers: {
                'Authorization': 'bearer ' + token,
            }
        })
            .then((response) => {
                // console.log('data', response.data?.topics)
                setTopics(response.data?.topics)
            })
            .catch((error) => console.error(error))
    }
    const customTopics = () => {
        const newArray = [];
        for (let i = 0; i < topics.length; i += 4) {
            const subArray = topics.slice(i, i + 4);
            newArray.push(subArray);
        }
        const newData = newArray.map((subArray) => {
            subArray.forEach((item) => {
                item.color = generateRandomColor();
            });
            return subArray;
        });
        setFetchData(newData);
    }
    useFocusEffect(
        useCallback(() => {
            // console.log('focus')
            getAllTopic()
        }, [])
    );
    useEffect(() => {
        getProfile()
    }, [])
    useEffect(() => {
        customTopics();
        // console.log('fetchData', fetchData)
    }, [topics])
    const renderItemFlastlist = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row', backgroundColor: item?.color,
                    alignItems: 'center', justifyContent: 'space-around',
                    borderRadius: 20, width: 90 * width / 100, alignSelf: 'center', marginTop: '5%',
                    height: height > 800 ? 19 * (80 * height / 100) / 100 : 19 * (80 * height / 100) / 100,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 3.5,
                    elevation: 3
                }}
                onPress={() => {
                    navigate('ProgressPlay', { id: item?.id })
                }}
            >
                <View style={{ width: '60%', height: '80%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={[styles.text, { fontSize: 14 }]}>{item?.numberOfPlayedGames}/{item?.numberOfGame}</Text>
                        <ProgressBar
                            progress={item?.numberOfPlayedGames / item?.numberOfGame}
                            width={120}
                            color={'#69b900'}
                            unfilledColor={'#FFFFFF'}
                            borderColor={'#FFFFFF'}
                        />
                    </View>
                    <Text style={[styles.text, { fontSize: 20 }]}>{item?.name}</Text>
                    <View
                        style={{
                            width: '28%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            shadowRadius: 3.5,
                            elevation: 5
                        }}>
                        <Text style={[styles.text, { fontSize: 15 }]}>Next</Text>
                        <Image
                            source={require('../../../assets/play.png')}
                            style={{ width: 15, height: 15, }}
                            resizeMode='contain'
                        />
                    </View>
                </View>
                <Image
                    source={{ uri: item?.image }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            </TouchableOpacity>
        )
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ width: width, alignItems: 'center', height: '100%' }}>
                <FlatList
                    data={item}
                    key={() => index.toString()}
                    renderItem={renderItemFlastlist}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={{ height: 75 * height / 100 }}>
                    <SwiperFlatList
                        data={fetchData}
                        renderItem={renderItem}
                        showPagination
                        renderAll={true}
                        paginationStyle={{ justifyContent: 'center', height: '3%', alignItems: 'center', position: 'relative' }}
                        paginationStyleItemActive={{ backgroundColor: '#f1c600', width: 25, height: 10 }}
                        paginationStyleItemInactive={{ backgroundColor: 'darkgray', width: 10, height: 10 }}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4,
    },
    text: {
        fontWeight: '600',
        color: '#FFFFFF'
    },
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, justifyContent: 'center' },

})

export default HomeScreen