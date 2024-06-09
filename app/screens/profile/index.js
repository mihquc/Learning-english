import {
    SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, useColorScheme, ScrollView, KeyboardAvoidingView
} from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';

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
    console.log(user);
    const [themeValue, setThemeValue] = useState('');
    const [initialValue, setInitialValue] = useState(0);
    const themes = useColorScheme();
    const data = [
        {
            label: 'Light Mode',
            value: 'light',
        },
        {
            label: 'Dark Mode',
            value: 'dark',
        },
        {
            label: 'System Default',
            value: 'default',
        },
    ];
    return (
        <SafeAreaView style={localStyles.container}>
            <View style={localStyles.body1}>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    source={{ uri: 'https://i.postimg.cc/Bv2nscWb/icon-default-avatar.png' }}
                    // source={{ uri: user.avatar == ' ' || !user.avatar ? LINK_IMAGE_DEFAULT : user.avatar }}
                    resizeMode='contain'
                />
                {/* user.name */}
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Minh Quốc</Text>
                <Text style={{ fontSize: 14, fontWeight: '300', color: 'gray' }}>Joined since 25th August 2024</Text>
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
            <View style={{ width: '85%', flex: 1, borderWidth: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Image
                        source={require('../../../assets/statistics.png')}
                        style={{ width: 20, height: 20 }}
                        resizeMode='contain'
                    />
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Statistics</Text>
                </View>
                <View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})