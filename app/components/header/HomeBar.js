import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ViewStyle, StyleProp, Text, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import i18n from '../../i18n';
import styles from '../../styles/styles';
import useNavigationService from '../../navigation/NavigationService';


const HomeBar = ({ ...props }) => {
  const { navigate } = useNavigationService();
  const insets = useSafeAreaInsets();

  const localStyles = React.useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          backgroundColor: '#f6cd12',
          paddingHorizontal: 16,
          paddingTop: Platform.OS === 'android' ? 16 : insets.top,
          paddingBottom: 10,
          justifyContent: 'space-between',
        },
        cardAvatar: {
          borderWidth: 1,
          borderColor: 'gay',
          width: 50,
          height: 50,
          borderRadius: 100,
        },
        iconProfile: {
          width: 27,
          height: 30,
        },
        title: {
          fontSize: 23,
          fontWeight: '700',
          color: '#FFFFFF',
          textTransform: 'none',
          textAlign: 'center',
          fontFamily: 'Pretendard-Bold',
        },
      }),
    [],
  );

  return (
    <View style={[localStyles.header, props?.backGroundColorHeader]}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={localStyles.cardAvatar}
          source={{ uri: 'https://i.postimg.cc/Bv2nscWb/icon-default-avatar.png' }}
          resizeMode="cover"
        />
        {/* <View style={{ height: 'auto', justifyContent: 'center' }}>
          <View style={{ marginLeft: 8 }}>
            <Text style={[styles.text16Bold, { color: colors.PRIMARY_900 }]}>{user?.customer?.fullName}</Text>
            <Text style={[styles.text12Regular, { fontSize: 13, color: colors.GRAY_300, marginTop: 4 }]}>
              {sumCount ? i18n.t('friend') + sumCount + i18n.t('contracts') : i18n.t('no_contracts')}
            </Text>
          </View>
        </View> */}
      </View>
      <View style={[
        { marginHorizontal: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
      ]}>
        <Text style={[styles.title, localStyles.title]} numberOfLines={2}>
          LION GO
        </Text>
      </View>
      <View style={{ height: 'auto', justifyContent: 'center' }}>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => {
              navigate('SettingsNavigator', {})
            }}
          >
            <Image
              source={require('../../../assets/settings.png')}
              style={[localStyles.iconProfile]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeBar;
