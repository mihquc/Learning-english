import {
    SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, useColorScheme, Dimensions,
    StatusBar,
    Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Line, G, Text as SvgText, Path } from 'react-native-svg';
import * as d3Scale from 'd3-scale';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import baseURL from '../../services/api/baseURL';

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
                height: '10%',
                justifyContent: 'space-around',
                alignItems: 'center'
            },
            body3: {
                width: '85%',
                height: '10%',
                alignItems: 'center',
                justifyContent: 'center'
            },
            bodyChild2: {
                alignItems: 'center'
            },
            textBodyChild2: {
                fontWeight: '600',
                fontSize: 15
            }
        }), [])
    const user = useSelector((state) => state.authReducer.user);
    const account = useSelector((state) => state.authReducer.account);
    const token = useSelector((state) => state.authReducer.token);
    console.log('user', user);
    console.log('account', account);
    const data = [
        { date: '2024-06-10', count: 3 },
        { date: '2024-06-11', count: 1 },
        { date: '2024-06-09', count: 2 },
        { date: '2024-06-08', count: 6 },
        { date: '2024-06-07', count: 4 },
    ]

    const getStaticsDay = () => {
        axios.get(`${baseURL}/profiles/${user?.id}/statistics/day`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'text/plain'
            }
        }).then((response) => {
            console.log('response', response.data)
        }).catch(error => {
            console.log('error', error)
        })
    }
    // useEffect(() => {
    //     getStaticsDay()
    // }, [])

    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth * 0.9;
    const chartHeight = 250;
    const margin = { top: 20, right: 20, bottom: 30, left: 20 };
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Prepare data
    const counts = weekdays.map(day => {
        const dayData = data.find(item => moment(item.date).format('ddd') === day);
        return dayData ? dayData.count : 0;
    });

    // Create x scale (days of the week)
    const xScale = d3Scale
        .scaleBand()
        .domain(weekdays)
        .range([margin.left, chartWidth - margin.right])
        .padding(0.2);

    // Create y scale (number of games)
    const yScale = d3Scale
        .scaleLinear()
        .domain([0, Math.max(...counts) + 1])
        .nice()
        .range([chartHeight - margin.bottom, margin.top]);

    // Function to render X axis labels
    const renderXAxis = () => {
        return weekdays.map((day, index) => (
            <SvgText
                key={index}
                x={xScale(day) + xScale.bandwidth() / 2}
                y={chartHeight - margin.bottom + 12}
                fontSize={12}
                textAnchor="middle"
            >
                {day}
            </SvgText>
        ));
    };

    // Function to render Y axis labels
    const renderYAxis = () => {
        const ticks = yScale.ticks(5);
        return ticks.map((tick, index) => (
            <SvgText
                key={index}
                x={margin.left - 5}
                y={yScale(tick) + 5}
                fontSize={12}
                textAnchor="end"
            >
                {tick}
            </SvgText>
        ));
    };

    // Function to render line between points
    const renderLine = () => {
        const points = weekdays.map((day, index) => ({
            x: xScale(day) + xScale.bandwidth() / 2,
            y: yScale(counts[index]),
        }));

        const linePath = points.map((point, index) => {
            return `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`;
        }).join(' ');

        return <Path d={linePath} stroke="blue" strokeWidth="2" fill="none" />;
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const [visible, setVisible] = useState(null);
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    const uploadImage = async (mode) => {
        let result = {}
        try {
            if (mode === 'gallery') {
                const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

                if (permissionResult.granted === false) {
                    Alert.alert("Permission to access camera is required!");
                    return;
                }
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else {
                const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (permissionResult.granted === false) {
                    Alert.alert("Permission to access camera roll is required!");
                    return;
                }

                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }
        } catch (error) {

        }

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    return (
        <SafeAreaView style={localStyles.container}>
            <View style={localStyles.body1}>
                <TouchableOpacity onPress={() => pickImage()}>
                    <Text>aaaa</Text>
                </TouchableOpacity>
                <View style={{ borderWidth: 2, borderRadius: 12 }}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                        source={{ uri: selectedImage ? selectedImage : 'https://i.postimg.cc/Bv2nscWb/icon-default-avatar.png' }}
                        // source={{ uri: user.avatar == ' ' || !user.avatar ? LINK_IMAGE_DEFAULT : user.avatar }}
                        resizeMode='cover'
                    />
                    <TouchableOpacity style={{ position: 'absolute', top: 70, left: 88 }}
                        onPress={() => setVisible(true)}
                    >
                        <Image
                            source={require('../../../assets/camera.png')}
                            style={{ width: 25, height: 25, tintColor: '#302627' }}
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
                <TouchableOpacity style={{
                    width: '40%',
                    flexDirection: 'row', alignItems: 'center',
                    padding: 12, borderRadius: 15, justifyContent: 'space-evenly',
                    backgroundColor: '#f2c601'
                }}>
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
            </View>
            <View style={{}}>

            </View>
            <View style={{ width: '90%', height: '45%', borderWidth: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Image
                        source={require('../../../assets/statistics.png')}
                        style={{ width: 20, height: 20 }}
                        resizeMode='contain'
                    />
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Statistics</Text>
                </View>
                <View>
                    <StatusBar barStyle="dark-content" />
                    <Svg width={chartWidth} height={chartHeight}>
                        <G>
                            {renderXAxis()}
                            {renderYAxis()}
                            {renderLine()}
                        </G>
                    </Svg>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})