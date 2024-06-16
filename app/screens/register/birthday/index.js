import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Platform, Modal } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import axios from 'axios'

import useNavigationService from '../../../navigation/NavigationService'
import { useRoute } from '@react-navigation/native'

const BirthdayScreen = () => {
    const [birthday, setBirthday] = useState(new Date());
    const [show, setShow] = useState(false);
    const route = useRoute()
    const token = route.params?.token;
    const id = route.params?.id;
    console.log(route.params)
    const onChange = (event, selectedDate) => {
        setBirthday(selectedDate);
        setShow(false);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const { navigate, goPop, goBack, goPopToTop } = useNavigationService();

    const updateProfile = () => {
        const data = {
            birthday: moment(birthday).format('YYYY-MM-DD'),
        }
        axios.put(`${baseURL}/profiles/${id}`, data,
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
                    setModalVisible(true)
                }
            }).catch((error) => console.error('error:', error))
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../../../../assets/birthday.png')}
                    resizeMode='contain'
                />
            </View>
            <View style={{ width: '100%', height: '30%', alignItems: 'center' }}>
                <TouchableOpacity style={{
                    width: '85%', height: '20%', borderWidth: 1, alignItems: 'center',
                    justifyContent: 'space-around', flexDirection: 'row', borderRadius: 10
                }}
                    onPress={() => setShow(true)}
                >
                    <View
                        // value={birthday}
                        // onChange={(text) => setBirthday(text)}
                        style={{ width: '85%', height: '100%', justifyContent: 'center' }}
                    >
                        <Text>{moment(birthday).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Image
                        source={require('../../../../assets/calendar.png')}
                        style={{ width: 20, height: 20, tintColor: 'gray' }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        value={birthday}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
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
                    onPress={() => {
                        setModalVisible(true)
                        // navigate('BirthdayScreen', {})
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#f2c601' }}>Bỏ qua</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Chúc mừng!</Text>
                        <Text style={{ fontSize: 15, textAlign: 'center', width: '75%' }}>
                            Tài khoản của bạn đã sẵn sàng để sử dụng
                        </Text>
                        <Image
                            source={require('../../../../assets/congra.png')}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                goPopToTop();
                                navigate('BeginScreen', {})
                            }}>
                            <Text style={styles.textStyle}>Bắt đầu lại nào!</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default BirthdayScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#f2c601',
    },
    textStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2196F3',
    },
})