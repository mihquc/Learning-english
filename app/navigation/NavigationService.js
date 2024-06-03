import { useNavigation, StackActions } from '@react-navigation/native';

const useNavigationService = () => {
    const navigation = useNavigation();

    const navigate = (name, params) => navigation.navigate(name, params);
    const goBack = () => navigation.goBack();
    const goPop = () => navigation.dispatch(StackActions.pop());
    const goPopToTop = () => navigation.dispatch(StackActions.popToTop());

    return { navigate, goBack, goPop, goPopToTop };
};

export default useNavigationService;