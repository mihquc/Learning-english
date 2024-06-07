import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    Platform,
    Modal,
    Pressable
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProgressBar from 'react-native-progress/Bar';

import useNavigationService from '../../navigation/NavigationService';
import styles from '../../styles/styles';



const ProgressGame = ({
    isIconBack,
    isIconClose,
    styleBtnClose,
    styleTextClose,
    isImageClose,
    progress,
    style,
    onClickBack,
    onClickClose,
    ...props
}) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { navigate, goBack, goPop, goPopMultiple } = useNavigationService();
    const [modalVisible, setModalVisible] = useState(false);

    const localStyles = React.useMemo(
        () =>
            StyleSheet.create({
                header: {
                    paddingHorizontal: 12,
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: 16,
                    backgroundColor: "#FFFFFF",
                    alignItems: 'center',
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

    // const imagesClose = isImageClose ? isImageClose : require('../../../assets/icon_close.png');
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
                    onPressIn={() => (onClickBack ? onClickBack() : setModalVisible(true))}
                    style={[localStyles.wrapperIcon, { padding: 8 }]}
                >
                    {isIconBack &&
                        (typeof isIconBack === 'boolean' ? (
                            <Image
                                source={require('../../../assets/close.png')}
                                style={localStyles.iconBack}
                                resizeMode="contain"
                            />
                        ) : (
                            <Text style={{ color: colors.white }}>{isIconBack}</Text>
                        ))}
                </TouchableOpacity>
                <View
                // style={[
                //     { marginHorizontal: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }
                // ]}
                >
                    <ProgressBar
                        progress={progress}
                        width={200}
                        color={'#69b900'}
                        unfilledColor={'#FFFFFF'}
                        borderColor={'#69b900'}
                        borderRadius={10}
                        height={10}
                        borderWidth={1}
                    />
                </View>
                <TouchableOpacity
                    style={[localStyles.wrapperIcon, props?.styleWrapperIcon]}
                    onPressIn={() => (onClickClose ? onClickClose() : goBack())}
                >
                    {isIconClose &&
                        (typeof isIconClose === 'boolean' ? (
                            <Image source={require('../../../assets/close.png')} style={[styleIconClose]} resizeMode="contain" />
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styless.centeredView}>
                    <View style={styless.modalView}>
                        {/* <Image
                            source={require('../../../assets/congra.png')}
                        /> */}
                        <Text style={styless.modalText}>You will lose all progress of this topic if you exit now.</Text>
                        <Pressable
                            style={[styless.button, styless.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styless.textStyle}>Continue</Text>
                        </Pressable>
                        <Pressable
                            style={[styless.buttonClose, { backgroundColor: 'white', padding: 10, }]}
                            onPress={() => {
                                goPopMultiple(2)
                            }}>
                            <Text style={[styless.textStyle, { color: 'red' }]}>Stop</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 15,
        padding: 10,
        paddingHorizontal: 25,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#f2c601',
    },
    textStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2196F3',
    },
})

export default ProgressGame;

