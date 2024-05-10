import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const EnglishLevel = () => {
    const localStyles = React.useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
            },
            text: {
                borderRadius: 10,
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'left',
                borderWidth: 0.5,
                padding: 10
            },
            imageText: {
                flexDirection: 'row',
                width: '85%',
                alignItems: 'center',
                marginTop: 14
            }
        }), [])
    const level = [
        { image: '', des: '1' },
        { image: '', des: '2' },
        { image: '', des: '3' },
        { image: '', des: '4' },
    ]
    const render = React.useMemo(() => (
        <View>
            {level.map((item, index) => (
                <TouchableOpacity key={index.toString()}>
                    <Text>{item.des}</Text>
                </TouchableOpacity>
            ))}
        </View>
    ))
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity>
                <Text>{item.des}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={localStyles.container}>
            <View style={localStyles.imageText}>
                <Image source={require('../../../../assets/lionlv.png')} resizeMode='contain' />
                <View style={{ width: '60%' }}>
                    <Text style={localStyles.text}>Trình độ tiếng anh của bạn ở mức nào ?</Text>
                </View>
            </View>
            <View>
                {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    data={level}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                /> */}
                {render}
            </View>
        </SafeAreaView>
    )
}

export default EnglishLevel

const styles = StyleSheet.create({})