import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeScreen from '../screens/home';
import { useTheme } from 'react-native-paper';
import LoginScreen from '../screens/login';
import Pronounce from '../screens/pronounce';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { colors } = useTheme();
    const labelOrIconColor = (focused) => (focused ? colors.onBackground : colors.outline);
    const dimensionWidth = Dimensions.get('window').width;
    const localStyles = React.useMemo(
        () =>
            StyleSheet.create({
                labelStyle: {
                    fontSize: 12,
                    fontFamily: 'Pretendard',
                    fontWeight: '400',
                    lineHeight: 15.6,
                    textAlign: 'center',
                },
                tabStyle: {
                    alignSelf: 'center',
                    paddingTop: 4,
                },
                wrapperIcon: {
                    alignSelf: 'center',
                },
                iconTab: {
                    paddingTop: 9,
                    paddingBottom: 7,
                    width: 24,
                    height: 24,
                },
                backGroundTab: {
                    width: dimensionWidth > 550 ? 200 : '100%',
                    borderRadius: 12,
                    paddingBottom: 6,
                    paddingTop: 10
                },
            }),
        [],
    );
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    left: 20,
                    elevation: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow,
                }
            }}
        >
            <Tab.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={{
                    headerShown: false,
                    // tabBarLabel: `${i18n.t('Trang chủ')}`,
                    tabBarLabel: 'Trang chủ',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={[localStyles.backGroundTab]}>
                                <View style={localStyles.wrapperIcon}>
                                    <Image
                                        source={require('../../assets/home.png')}
                                        style={[localStyles.iconTab, { tintColor: labelOrIconColor(focused) }]}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={localStyles.tabStyle}>
                                    <Text style={[localStyles.labelStyle, { color: labelOrIconColor(focused) }]}>
                                        Trang chủ
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={'PronounceScreen'}
                component={Pronounce}
                options={{
                    headerShown: false,
                    // tabBarLabel: `${i18n.t('Trang chủ')}`,
                    tabBarLabel: 'Trang chủ',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={[localStyles.backGroundTab]}>
                                <View style={localStyles.wrapperIcon}>
                                    <Image
                                        source={require('../../assets/li_home.png')}
                                        style={[localStyles.iconTab, { tintColor: labelOrIconColor(focused) }]}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={localStyles.tabStyle}>
                                    <Text style={[localStyles.labelStyle, { color: labelOrIconColor(focused) }]}>
                                        Trang chủ
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={'LoginScreen'}
                component={LoginScreen}
                options={{
                    headerShown: false,
                    // tabBarLabel: `${i18n.t('Trang chủ')}`,
                    tabBarLabel: 'Trang chủ',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={[localStyles.backGroundTab]}>
                                <View style={localStyles.wrapperIcon}>
                                    <Image
                                        source={require('../../assets/li_home.png')}
                                        style={[localStyles.iconTab, { tintColor: labelOrIconColor(focused) }]}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={localStyles.tabStyle}>
                                    <Text style={[localStyles.labelStyle, { color: labelOrIconColor(focused) }]}>
                                        Trang chủ
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={'a'}
                component={LoginScreen}
                options={{
                    headerShown: false,
                    // tabBarLabel: `${i18n.t('Trang chủ')}`,
                    tabBarLabel: 'Trang chủ',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={[localStyles.backGroundTab]}>
                                <View style={localStyles.wrapperIcon}>
                                    <Image
                                        source={require('../../assets/li_home.png')}
                                        style={[localStyles.iconTab, { tintColor: labelOrIconColor(focused) }]}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={localStyles.tabStyle}>
                                    <Text style={[localStyles.labelStyle, { color: labelOrIconColor(focused) }]}>
                                        Trang chủ
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={'c'}
                component={LoginScreen}
                options={{
                    headerShown: false,
                    // tabBarLabel: `${i18n.t('Trang chủ')}`,
                    tabBarLabel: 'Trang chủ',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={[localStyles.backGroundTab]}>
                                <View style={localStyles.wrapperIcon}>
                                    <Image
                                        source={require('../../assets/li_home.png')}
                                        style={[localStyles.iconTab, { tintColor: labelOrIconColor(focused) }]}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={localStyles.tabStyle}>
                                    <Text style={[localStyles.labelStyle, { color: labelOrIconColor(focused) }]}>
                                        Trang chủ
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 5
    }
})