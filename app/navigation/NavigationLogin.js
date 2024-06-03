import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import i18n from '../i18n';

import BackBar from '../components/BackBar';

import useNavigationService from './NavigationService';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ForgotPassword from '../screens/forgotPass/ForgotPassword';
import ResetPassword from '../screens/forgotPass/ResetPassword';
import NewPassword from '../screens/forgotPass/NewPassword';
import WelcomeBack from '../screens/forgotPass/WelcomeBack';

const stack = createNativeStackNavigator();
const NavigationLogin = () => {
    const { navigate, goBack, goPop } = useNavigationService();
    return (
        <stack.Navigator headerMode="screen" initialRouteName="LoginScreen">
            <stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    header: () => <BackBar style={{ paddingHorizontal: 17 }} isIconBack styleWrapperIcon={{ marginRight: 8 }} />,
                    gestureEnabled: false,
                }}
            />
            <stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerTransparent: true,
                    header: () => <BackBar style={{ paddingHorizontal: 17 }} isIconBack styleWrapperIcon={{ marginRight: 8 }} />,
                }}
            />
            <stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    headerTransparent: true,
                    header: () => <BackBar style={{ paddingHorizontal: 17 }} isIconBack styleWrapperIcon={{ marginRight: 8 }} />,
                }}
            />
            <stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                    headerTransparent: true,
                    header: () => <BackBar style={{ paddingHorizontal: 17 }} isIconBack styleWrapperIcon={{ marginRight: 8 }} />,
                }}
            />
            <stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{
                    headerTransparent: true,
                    header: () => <BackBar style={{ paddingHorizontal: 17 }} isIconBack styleWrapperIcon={{ marginRight: 8 }} />,
                }}
            />
            <stack.Screen
                name="WelcomeBack"
                component={WelcomeBack}
                options={{
                    headerTransparent: true,
                    header: () => <></>
                }}
            />
            {/* <stack.Screen
                name="ResetOTPPage"
                component={ResetOTPPage}
                options={{
                    headerTransparent: true,
                    header: () => <BackBar onClickBack={() => {
                        goBack()
                    }}
                        title={String(i18n.t('login.simple_password_reset'))} isIconBack />,
                    headerShown: true,
                }}
            />
            <stack.Screen
                name="ConfirmOTPPage"
                component={confirmOTPPage}
                options={{
                    headerTransparent: true,
                    header: () => <BackBar title={String(i18n.t('login.simple_password_confirmation'))} isIconBack />,
                    headerShown: true,
                }}
            />
            <stack.Screen
                name="ResetOTPSuccess"
                component={ResetOTPSuccess}
                options={{
                    headerTransparent: true,
                    headerShown: false,
                }}
            /> */}
        </stack.Navigator>
    );
};

export default NavigationLogin;
