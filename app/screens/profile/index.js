import {
    SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, useColorScheme, Dimensions,
    StatusBar,
    Alert,
    Modal,
    TouchableWithoutFeedback,
    Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Line, G, Text as SvgText, Path } from 'react-native-svg';
import * as d3Scale from 'd3-scale';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

import baseURL from '../../services/api/baseURL';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ProfileScreen = () => {
    const localStyles = React.useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                // justifyContent: 'flex-start'
            },
            body1: {
                alignItems: 'center',
                width: '85%',
                height: '26%',
                justifyContent: 'space-evenly',
                borderBottomWidth: 0.8,
                borderColor: '#E6E6E6'
            },
            body2: {
                flexDirection: 'row',
                borderBottomWidth: 0.8,
                borderColor: '#E6E6E6',
                width: '85%',
                height: '9%',
                justifyContent: 'space-around',
                alignItems: 'center'
            },
            body3: {
                flexDirection: 'row',
                width: '85%',
                height: '10%',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            },
            body4: {
                width: '90%', height: screenHeight * 0.36, alignItems: 'center', borderRadius: 10, backgroundColor: '#b8ff97',
                shadowOffset: { width: 0, height: 0.3 }, shadowColor: '#000', shadowOpacity: 0.2,
                shadowRadius: 2, elevation: 5, justifyContent: 'center'
            },
            bodyChild2: {
                alignItems: 'center'
            },
            textBodyChild2: {
                fontWeight: '600',
                fontSize: 15
            }
        }), [])
    const dispatch = useDispatch()
    const user = useSelector((state) => state.authReducer.user);
    const account = useSelector((state) => state.authReducer.account);
    const token = useSelector((state) => state.authReducer.token);
    // console.log('user', user);
    // console.log('account', account);
    const [dataDay, setDataDay] = useState([])
    const [dataMonth, setDataMonth] = useState([])

    const getStaticsDay = () => {
        axios.get(`${baseURL}/profiles/${user?.id}/statistics/day`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'text/plain'
            }
        }).then((response) => {
            // console.log('response', response.data?.days)
            setDataDay(response.data?.days)
        }).catch(error => {
            console.log('error', error.response)
        })
    }
    const getStaticsMonth = () => {
        axios.get(`${baseURL}/profiles/${user?.id}/statistics/month`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'text/plain'
            }
        }).then((response) => {
            // console.log('response', response.data?.months)
            setDataMonth(response.data?.months)
        }).catch(error => {
            console.log('error', error.response)
        })
    }
    useEffect(() => {
        getStaticsDay()
        getStaticsMonth()
    }, [])

    const data = [
        { label: 'Day', value: '1' },
        { label: 'Month', value: '2' },
    ];
    const [value, setValue] = useState('1');
    const chartWidth = screenWidth * 0.9;
    const chartHeight = 250;
    const margin = { top: 20, right: 20, bottom: 30, left: 20 };

    const formattedDayss = dataDay.map(item => moment(item.day).format('DD/MM'));
    const counts = dataDay.map(item => item.numberOfGames);

    const formatDailyData = () => {
        const formattedDays = dataDay.map(item => moment(item.day).format('DD/MM'));
        const counts = dataDay.map(item => item.numberOfGames);
        return { formattedDays, counts };
    };

    const formatMonthlyData = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedMonths = dataMonth.map(item => months[item.month - 1]);
        const counts = dataMonth.map(item => item.numberOfGames);
        return { formattedMonths, counts };
    };
    const { formattedDays, counts: dailyCounts } = formatDailyData();
    const { formattedMonths, counts: monthlyCounts } = formatMonthlyData();


    const LineChart = ({ labels, counts }) => {
        const xScale = d3Scale
            .scaleBand()
            .domain(labels)
            .range([margin.left, chartWidth - margin.right])
            .padding(0.2);

        const yScale = d3Scale
            .scaleLinear()
            .domain([0, Math.max(...counts) + 1])
            .nice()
            .range([chartHeight - margin.bottom, margin.top]);

        const renderXAxis = () => {
            return labels.map((label, index) => (
                <SvgText
                    key={index}
                    x={xScale(label) + xScale.bandwidth() / 2}
                    y={chartHeight - margin.bottom + 15}
                    fontSize={12}
                    fill="black" // Text color
                    textAnchor="middle"
                >
                    {label}
                </SvgText>
            ));
        };

        const renderYAxis = () => {
            const ticks = yScale.ticks(5);
            return ticks.map((tick, index) => (
                <SvgText
                    key={index}
                    x={margin.left + 7}
                    y={yScale(tick) + 5}
                    fontSize={12}
                    fill="black" // Text color
                    textAnchor="end"
                >
                    {tick}
                </SvgText>
            ));
        };

        const renderHorizontalGridLines = () => {
            const ticks = yScale.ticks(5);
            return ticks.map((tick, index) => (
                <Line
                    key={index}
                    x1={margin.left + 17}
                    y1={yScale(tick)}
                    x2={chartWidth - margin.right}
                    y2={yScale(tick)}
                    stroke="lightgray"
                />
            ));
        };

        const renderVerticalGridLines = () => {
            return labels.map((label, index) => (
                <Line
                    key={index}
                    x1={xScale(label) + xScale.bandwidth() / 2}
                    y1={chartHeight - margin.bottom}
                    x2={xScale(label) + xScale.bandwidth() / 2}
                    y2={margin.top}
                    stroke="lightgray"
                />
            ));
        };

        const renderLine = () => {
            const points = labels.map((label, index) => ({
                x: xScale(label) + xScale.bandwidth() / 2,
                y: yScale(counts[index]),
            }));

            const linePath = points.map((point, index) => {
                return `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`;
            }).join(' ');

            return <Path d={linePath} stroke="blue" strokeWidth="2" fill="none" />;
        };

        return (
            <Svg width={chartWidth} height={chartHeight}>
                {renderHorizontalGridLines()}
                {renderVerticalGridLines()}
                {renderXAxis()}
                {renderYAxis()}
                {renderLine()}
            </Svg>
        );
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const uploadImage = async (mode) => {
        let result = {}
        try {
            if (mode === 'gallery') {
                const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (permissionResult.granted === false) {
                    Alert.alert("Permission to access camera is required!");
                    return;
                }
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else if (mode === 'camera') {
                const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

                if (permissionResult.granted === false) {
                    Alert.alert("Permission to access camera roll is required!");
                    return;
                }

                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }
        } catch (error) {
            console.error(error)
        }
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            storeImage(result.assets[0].uri)
            updateProfile(result.assets[0].uri)
        }
    };
    const updateProfile = (selectedImage) => {
        formData = {
            sex: user?.sex,
            birthday: user?.birthday,
            status: user?.status,
            avatarFilePath: selectedImage
        }
        axios.put(`${baseURL}/profiles/${user?.id}`, formData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('response', response.data)
        }).catch((error) => {
            console.log('error', error)
        })
    }
    const storeImage = (image) => {
        dispatch({
            type: 'SET_IMAGE',
            image: image
        })
    }

    return (
        <SafeAreaView style={localStyles.container}>
            <View style={localStyles.body1}>
                <View style={{ borderWidth: 2, borderRadius: 12 }}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                        source={{ uri: selectedImage !== null ? selectedImage : (user?.avatarFilePath == ' ' || !user?.avatarFilePath ? 'https://i.postimg.cc/Bv2nscWb/icon-default-avatar.png' : user?.avatarFilePath) }}
                        resizeMode='cover'
                    />
                    <TouchableOpacity style={{ position: 'absolute', top: 70, left: 88 }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            source={require('../../../assets/camera.png')}
                            style={{ width: 25, height: 25, tintColor: 'green' }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>

                {/* user.name */}
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{account?.userName}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: 'gray' }}>{moment(user?.birthday).format("Do MMMM YYYY")}</Text>
            </View>
            <View style={localStyles.body2}>
                <View style={localStyles.bodyChild2}>
                    <Text style={localStyles.textBodyChild2}>123</Text>
                    <Text style={{ fontWeight: '400', color: 'gray' }}>Followers</Text>
                </View>
                <View style={localStyles.bodyChild2}>
                    <Text style={localStyles.textBodyChild2}>123</Text>
                    <Text style={{ fontWeight: '400', color: 'gray' }}>Words</Text>
                </View>
            </View>
            <View style={localStyles.body3}>
                <TouchableOpacity style={styles.btn}>
                    <Image
                        source={require('../../../assets/edit.png')}
                        style={{ width: 15, height: 15 }}
                        resizeMode='contain'
                        tintColor={'white'}
                    />
                    <Text style={{ color: 'white', fontSize: 15 }}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>

                <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.selectedTextStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={styles.containerStyle}
                    itemContainerStyle={styles.itemContainerStyle}
                    itemTextStyle={styles.itemTextStyle}
                    activeColor={'#00CC00'}
                    data={data}
                    maxHeight={110}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select item'}
                    value={value}
                    onChange={item => {
                        setValue(item.value);
                    }}
                />
            </View>
            <View style={localStyles.body4}
            >
                <View style={{
                    flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5,
                    height: Platform.OS === 'android' ? '7%' : '10%'
                }}>
                    <Image
                        source={require('../../../assets/statistics.png')}
                        style={{ width: 20, height: 20 }}
                        resizeMode='contain'
                    />
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Statistics</Text>
                </View>
                <View style={{
                    alignItems: 'center', width: '100%',
                    height: Platform.OS === 'android' ? '93%' : '90%'
                }}>
                    <StatusBar barStyle="dark-content" />
                    {value === '1' ? (
                        <LineChart labels={formattedDays} counts={dailyCounts} />
                    ) : (
                        <LineChart labels={formattedMonths} counts={monthlyCounts} />
                    )}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.button}
                                onPress={() => {
                                    uploadImage('gallery');
                                    updateProfile();
                                }}
                            >
                                <Text style={styles.modalText}>
                                    Gallery
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}
                                onPress={() => {
                                    uploadImage('camera');
                                    updateProfile();
                                }}
                            >
                                <Text style={styles.modalText}>
                                    Camera
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        width: '80%',
        height: '32%',
        backgroundColor: '#f2c601',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    btn: {
        width: '40%',
        flexDirection: 'row', alignItems: 'center',
        padding: 12, borderRadius: 15, justifyContent: 'space-evenly',
        backgroundColor: '#f2c601'
    },
    dropdown: {
        width: '40%',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f2c601',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'white',
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: 'white',
    },
    containerStyle: {
        backgroundColor: '#f2c601',
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    itemContainerStyle: {
        borderRadius: 10
    },
    itemTextStyle: {
        fontSize: 16,
        color: 'white',
    }
})