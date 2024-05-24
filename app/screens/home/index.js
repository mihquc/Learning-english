import {
    FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView
} from 'react-native'
import React from 'react'
import ProgressBar from 'react-native-progress/Bar';

const width = Dimensions.get('window').width;
const HomeScreen = () => {
    const data = [
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

    const updatedData = data.map((item) => ({
        ...item,
        color: generateRandomColor(),
    }));
    const renderDots = (list, currentIndex) => {
        return list.map((e, index) => (
            <View
                key={index.toString()}
                style={[
                    styles.dot,
                    {
                        backgroundColor: index === currentIndex ? '#f1c600' : 'darkgray',
                        width: index === currentIndex ? 15 : 8
                    },
                ]}
            />
        ));
    };
    const renderItem = ({ item, index }) => {
        console.log(item?.color)
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
            >
                <View style={{ width: '60%', height: '50%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>{item?.gamesPlayed}/{item?.totalGames}</Text>
                        <ProgressBar
                            progress={item?.gamesPlayed / item?.totalGames}
                            width={140}
                            color={'#69b900'}
                            unfilledColor={'#FFFFFF'}
                        />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>{item?.nameTopic}</Text>
                </View>
                <Image
                    source={{ uri: item?.image }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: width, marginTop: '10%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {renderDots(data, 1)}
            </View>
            <View style={{ height: '100%' }}>
                <FlatList
                    data={updatedData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
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
})

export default HomeScreen