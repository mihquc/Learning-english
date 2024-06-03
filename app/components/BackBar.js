import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    Platform,
    ImageSourcePropType,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import i18n from '../i18n';
import useNavigationService from './../navigation/NavigationService';
import styles from '../styles/styles';



const BackBar = ({
    isIconBack,
    isIconClose,
    styleBtnClose,
    styleTextClose,
    isImageClose,
    title,
    style,
    onClickBack,
    onClickClose,
    ...props
}) => {
    const { colors } = useTheme();
    const route = useRoute();
    const titleRoute = i18n.t(`navigation_header.${route.name}`);
    const insets = useSafeAreaInsets();
    const { navigate, goBack, goPop } = useNavigationService();

    const localStyles = React.useMemo(
        () =>
            StyleSheet.create({
                header: {
                    paddingHorizontal: 12,
                    paddingTop: Platform.OS === 'android' ? 16 : insets.top,
                    paddingBottom: 16,
                    backgroundColor: "#FFFFFF",
                    alignItems: 'center',
                },
                title: {
                    fontSize: 23,
                    fontWeight: '700',
                    color: colors.PRIMARY_900,
                    textTransform: 'none',
                    textAlign: 'center',
                },
                wrapperIcon: {
                    justifyContent: 'center',
                },
                iconBack: {
                    width: 20,
                    height: 18,
                    tintColor: colors.PRIMARY_900,
                },
                iconNotification: {
                    width: 24,
                    height: 24,
                    tintColor: colors.PRIMARY_900,
                },
                titleIconClose: {
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: colors.PRIMARY_500,
                    paddingBottom: 3,
                },
            }),
        [],
    );

    const imagesClose = isImageClose ? isImageClose : require('../../assets/icon-close.png');
    const styleIconClose = isImageClose ? localStyles.iconNotification : localStyles.iconBack;

    return (
        <View style={[localStyles.header, style]}>
            <View
                style={[
                    styles.rowCenter,
                    {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    },
                ]}
            >
                <TouchableOpacity
                    onPressIn={() => (onClickBack ? onClickBack() : goBack())}
                    style={[localStyles.wrapperIcon, { padding: 8 }]}
                >
                    {isIconBack &&
                        (typeof isIconBack === 'boolean' ? (
                            <Image
                                source={require('../../assets/icon_back.png')}
                                style={localStyles.iconBack}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text style={{ color: colors.white }}>{isIconBack}</Text>
                        ))}
                </TouchableOpacity>
                <View
                    style={[
                        { marginHorizontal: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
                        props?.styleTitle,
                    ]}
                >
                    <Text style={[styles.title, localStyles.title]} numberOfLines={2}>
                        {title ? title : titleRoute}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[localStyles.wrapperIcon, props?.styleWrapperIcon]}
                    onPressIn={() => (onClickClose ? onClickClose() : goBack())}
                >
                    {isIconClose &&
                        (typeof isIconClose === 'boolean' ? (
                            <Image source={imagesClose} style={[styleIconClose]} resizeMode="contain" />
                        ) : (
                            <View
                                style={[
                                    { borderBottomWidth: 1, borderBottomColor: colors.PRIMARY_500, width: 'auto', maxWidth: 70 },
                                    styleBtnClose,
                                ]}
                            >
                                <Text style={[localStyles.titleIconClose, styleTextClose]}>{isIconClose}</Text>
                            </View>
                        ))}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BackBar;
