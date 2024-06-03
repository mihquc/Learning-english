import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Platform, Modal } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import useNavigationService from '../../../navigation/NavigationService'

const BirthdayScreen = () => {
    const [birthday, setBirthday] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        setBirthday(selectedDate);
        setShow(false);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const { navigate, goPop, goBack, goPopToTop } = useNavigationService();
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
                    onPress={() => navigate('BirthdayScreen', {})}
                >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#FFFFFF' }}>Next</Text>
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
                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#f2c601' }}>Skip</Text>
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
                        <Text style={styles.modalText}>Congratulations!</Text>
                        <Text style={{ fontSize: 15 }}>You account is ready to use</Text>
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
                            <Text style={styles.textStyle}>Let's Go</Text>
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