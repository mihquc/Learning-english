import { StyleSheet, Text, View, Image, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useNavigationService from '../../../navigation/NavigationService';

const EnglishLevel = () => {
    const [selectButton, setSelectButton] = useState(null);
    const { navigate } = useNavigationService();
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
            },
            buttonBottom: {
                // position: 'relative',
                top: Platform.OS === 'android' ? 200 : 280,
                alignItems: 'center',
                borderRadius: 10,
                width: '85%',
                paddingVertical: 17,
            },
            iconTick: {
                position: 'relative',
                width: 22,
                height: 22,
                right: -15
            },
        }), [])
    const level = [
        { id: 1, image: '', des: 'Tôi mới học tiếng anh' },
        { id: 2, image: '', des: 'Tôi biết một vài từ thông dụng' },
        { id: 3, image: '', des: 'Tôi có thể giao tiếp cơ bản' },
        { id: 4, image: '', des: 'Tôi có thể nói về nhiều chủ đề' },
        { id: 5, image: '', des: 'Tôi có thể thảo luận sâu về hầu hết các chủ đề' },
    ]
    const handlePress = (id) => {
        if (selectButton === id) {
            setSelectButton(null)
        } else {
            setSelectButton(id)
        }
    }
    const render = React.useMemo(() => (
        <View style={{ width: '88%' }}>
            {level.map((item, index) => (
                <TouchableOpacity key={index.toString()}
                    style={{
                        borderWidth: 2, paddingHorizontal: 20, marginTop: 14, borderRadius: 10, flexDirection: 'row',
                        height: 60, alignItems: 'center', justifyContent: 'space-between', borderColor: selectButton === item.id ? '#6ce679' : 'gray'
                    }}
                    onPress={() => handlePress(item.id)}
                >
                    <View style={{}}>
                        <Image />
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.des}</Text>
                    </View>
                    {(selectButton === item.id) && (
                        <Image source={require('../../../../assets/tick.png')} resizeMode='contain'
                            style={localStyles.iconTick}
                        />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    ))
    // const renderItem = ({ item, index }) => {
    //     return (
    //         <TouchableOpacity>
    //             <View>
    //                 <Text>{item.des}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

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
            <TouchableOpacity style={[localStyles.buttonBottom,
            {
                backgroundColor: selectButton ? '#f2c601' : '#e5e5e5',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 3.5,
                elevation: 3
            }]}
                disabled={selectButton === null}
                onPress={() => navigate('EnglishLevel', {})}
            >
                <Text style={{ fontSize: 17, fontWeight: '500', color: selectButton ? 'black' : 'gray' }}>Tiếp tục</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default EnglishLevel

const styles = StyleSheet.create({})