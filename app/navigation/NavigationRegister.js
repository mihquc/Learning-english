import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useStoreActions } from 'easy-peasy';
import { useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import i18n from '../i18n';


import BackBar from '../components/BackBar';
import RegisterScreen from '../screens/register';
import GenderScreen from '../screens/register/gender';
import BirthdayScreen from '../screens/register/birthday';

const stack = createNativeStackNavigator();
const NavigationRegister = () => {
  // const { setIsRegisterSkipOTP } = useStoreActions(modalActionSelector);
  const { colors } = useTheme();
  const onClickRegisterSkip = () => {
    setIsRegisterSkipOTP(true);
  };
  const localStyles = React.useMemo(
    () =>
      StyleSheet.create({
        titleIconClose: {
          fontSize: 16,
          lineHeight: 19,
          fontWeight: '400',
          textAlign: 'center',
          color: colors.PRIMARY_500,
          paddingBottom: 2,
          borderBottomWidth: 1,
          borderColor: colors.PRIMARY_500,
        },
      }),
    [],
  );
  return (
    <stack.Navigator headerMode="screen" initialRouteName="Register">
      <stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTransparent: true,
          header: () => <BackBar style={{ paddingHorizontal: 17 }} isIconBack styleWrapperIcon={{ marginRight: 8 }} />,
        }}
      />
      <stack.Screen
        name="GenderScreen"
        component={GenderScreen}
        options={{
          headerTransparent: true,
          header: () => <BackBar title={String(i18n.t('register.gender'))} isIconBack />,
          headerShown: true,
        }}
      />
      <stack.Screen
        name="BirthdayScreen"
        component={BirthdayScreen}
        options={{
          headerTransparent: true,
          header: () => <BackBar title={String(i18n.t('register.birthday'))} isIconBack />,
          headerShown: true,
        }}
      />
    </stack.Navigator>
  );
};

export default NavigationRegister;
