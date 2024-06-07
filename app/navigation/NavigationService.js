import { useNavigation, StackActions } from '@react-navigation/native';

const useNavigationService = () => {
    const navigation = useNavigation();

    const navigate = (name, params) => navigation.navigate(name, params);
    const goBack = () => navigation.goBack();
    const goPop = () => navigation.dispatch(StackActions.pop());
    const goPopToTop = () => navigation.dispatch(StackActions.popToTop());
    const goPopMultiple = (count) => navigation.dispatch(StackActions.pop(count));

    return { navigate, goBack, goPop, goPopToTop, goPopMultiple };
};

export default useNavigationService;