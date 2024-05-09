import React from 'react';
import { useNavigation } from '@react-navigation/native';

const useNavigationService = () => {
    const navigation = useNavigation();

    const navigate = (name, params) => navigation.navigate(name, params);
    const goBack = () => navigation.goBack();
    const goPop = () => navigation.dispatch(StackActions.pop());

    return { navigate, goBack, goPop };
};

export default useNavigationService;