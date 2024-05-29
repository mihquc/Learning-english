import {
    FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ProgressBar from 'react-native-progress/Bar';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
// import * as Tts from 'react-native-tts';
import * as Speech from 'expo-speech';
// import { Speech } from 'expo'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const HomeScreen = () => {
    const [fetchData, setFetchData] = useState([])
    // Speech.speak({
    //     text: 'Helle',
    //     voice: 'en-US'
    // })
    const data = [
        page = [
            {
                id: 1,
                nameTopic: 'Animals',
                image: 'https://img.freepik.com/free-vector/wild-animal-group-white-background_1308-112351.jpg',
                totalGames: 15,
                gamesPlayed: 5
            },
            {
                id: 2,
                nameTopic: 'In the city',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8QWNQBZ73iGocTQkmusw4f1XpGeI-uUIj8B6zZzwrKw&s',
                totalGames: 20,
                gamesPlayed: 12
            },
            {
                id: 3,
                nameTopic: 'Alphabet',
                image: 'https://illustoon.com/photo/13121.png',
                totalGames: 25,
                gamesPlayed: 1
            },
            {
                id: 4,
                nameTopic: 'Nature',
                image: 'https://i.pinimg.com/736x/54/f6/fe/54f6fe85a42a39b6e57d2008cf18964f.jpg',
                totalGames: 28,
                gamesPlayed: 7
            },
        ],
        page = [
            {
                id: 1,
                nameTopic: 'Animals',
                image: 'https://img.freepik.com/free-vector/wild-animal-group-white-background_1308-112351.jpg',
                totalGames: 15,
                gamesPlayed: 5
            },
            {
                id: 2,
                nameTopic: 'In the city',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8QWNQBZ73iGocTQkmusw4f1XpGeI-uUIj8B6zZzwrKw&s',
                totalGames: 20,
                gamesPlayed: 12
            },
            {
                id: 3,
                nameTopic: 'Alphabet',
                image: 'https://illustoon.com/photo/13121.png',
                totalGames: 25,
                gamesPlayed: 1
            },
            {
                id: 4,
                nameTopic: 'Nature',
                image: 'https://i.pinimg.com/736x/54/f6/fe/54f6fe85a42a39b6e57d2008cf18964f.jpg',
                totalGames: 28,
                gamesPlayed: 7
            },
        ]

    ]
    const listAllVoiceOptions = async () => {
        let voices = await Speech.getAvailableVoicesAsync();
        console.log(voices);
    };
    useEffect(() => {
        // listAllVoiceOptions();
        const newData = data.map((item) => {
            return item.map((ite) => ({
                ...ite,
                color: generateRandomColor()
            }))
        });
        setFetchData(newData);
    }, [])
    const data1 = [
        {
            id: 1,
            nameTopic: 'Animals',
            image: 'https://img.freepik.com/free-vector/wild-animal-group-white-background_1308-112351.jpg',
            totalGames: 15,
            gamesPlayed: 5
        },
        {
            id: 2,
            nameTopic: 'In the city',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8QWNQBZ73iGocTQkmusw4f1XpGeI-uUIj8B6zZzwrKw&s',
            totalGames: 20,
            gamesPlayed: 12
        },
        {
            id: 3,
            nameTopic: 'Alphabet',
            image: 'https://illustoon.com/photo/13121.png',
            totalGames: 25,
            gamesPlayed: 1
        },
        {
            id: 4,
            nameTopic: 'Nature',
            image: 'https://i.pinimg.com/736x/54/f6/fe/54f6fe85a42a39b6e57d2008cf18964f.jpg',
            totalGames: 28,
            gamesPlayed: 7
        },
    ]
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleSpeak = (text) => {
        Speech.speak(text,
            options = {
                voice: "com.apple.speech.synthesis.voice.Fred",
                // language: 'en-US',
                pitch: 1,
                rate: 1.2
            }
        )
    }
    const renderItemFlastlist = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row', backgroundColor: item?.color,
                    alignItems: 'center', justifyContent: 'space-around',
                    borderRadius: 20, width: 90 * width / 100, alignSelf: 'center', marginTop: 20,
                    height: Platform.OS === 'android' ? 120 : 140,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 3.5,
                    elevation: 3
                }}
                onPress={() => { handleSpeak('Cat') }}
            >
                <View style={{ width: '60%', height: '80%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={[styles.text, { fontSize: 14 }]}>{item?.gamesPlayed}/{item?.totalGames}</Text>
                        <ProgressBar
                            progress={item?.gamesPlayed / item?.totalGames}
                            width={110}
                            color={'#69b900'}
                            unfilledColor={'#FFFFFF'}
                            borderColor={'#FFFFFF'}
                        />
                    </View>
                    <Text style={[styles.text, { fontSize: 20 }]}>{item?.nameTopic}</Text>
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
            <View style={{ width: width, alignItems: 'center' }}>
                <FlatList
                    data={item}
                    key={() => index.toString()}
                    renderItem={renderItemFlastlist}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '100%' }}>
                <SwiperFlatList
                    data={fetchData}
                    renderItem={renderItem}
                    showPagination
                    renderAll={true}
                    paginationStyle={{ marginBottom: Platform.OS === 'android' ? '15%' : '10%' }}
                    paginationStyleItemActive={{ backgroundColor: '#f1c600', width: 25, height: 10 }}
                    paginationStyleItemInactive={{ backgroundColor: 'darkgray', width: 10, height: 10 }}
                />
            </View>
        </SafeAreaView>
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