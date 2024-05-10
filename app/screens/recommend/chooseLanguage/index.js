import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import React, { useState } from 'react'
import useNavigationService from '../../../navigation/NavigationService';

const ChooseLanguage = () => {
    const [isPress, setIsPress] = useState(false);
    const { navigate } = useNavigationService();
    const localStyles = React.useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
            },
            text: {
                fontSize: 20,
                fontWeight: '500',
            },
            imageText: {
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 15,
            },
            buttonSelect: {
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                width: '85%',
                paddingVertical: 17,
                justifyContent: 'space-between',
                marginTop: 15
            },
            iconVietnam: {
                width: 34,
                height: 20,
                borderRadius: 2,
            },
            textButton: {
                fontSize: 16,
                fontWeight: '500'
            },
            iconTick: {
                position: 'relative',
                width: 22,
                height: 22,
                right: 10
            },
            iconText: {
                flexDirection: 'row',
                width: '42%',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            },
            buttonBottom: {
                position: 'relative',
                top: Platform.OS === 'android' ? 500 : 550,
                alignItems: 'center',
                borderRadius: 10,
                width: '85%',
                paddingVertical: 17,
            }
        }), [])
    return (
        <SafeAreaView style={localStyles.container}>
            <View style={localStyles.imageText}>
                <Image source={require('../../../../assets/lion2.png')}
                    style={{ width: 90, height: 100 }} resizeMode='contain'
                />
                <Text style={localStyles.text}>Bạn muốn học gì nhỉ ?</Text>
            </View>
            <TouchableOpacity style={[localStyles.buttonSelect, {
                borderColor: isPress ? '#6ce679' : 'gray',
                borderWidth: isPress ? 1 : 0.5,
            }]}
                onPress={() => setIsPress(!isPress)}
            >
                <View style={localStyles.iconText}>
                    <Image source={require('../../../../assets/america.png')} resizeMode='stretch'
                        style={localStyles.iconVietnam}
                    />
                    <Text style={localStyles.textButton}>Tiếng Anh</Text>
                </View>
                {isPress && (
                    <Image source={require('../../../../assets/tick.png')} resizeMode='contain'
                        style={localStyles.iconTick}
                    />
                )}
            </TouchableOpacity>
            <TouchableOpacity style={[localStyles.buttonBottom,
            {
                backgroundColor: isPress ? '#f2c601' : '#e5e5e5',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 3.5,
                elevation: 3
            }]}
                disabled={!isPress}
                onPress={() => navigate('EnglishLevel', {})}
            >
                <Text style={{ fontSize: 17, fontWeight: '500', color: isPress ? 'black' : 'gray' }}>Tiếp tục</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChooseLanguage
