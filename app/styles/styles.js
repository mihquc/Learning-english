import { Dimensions, Platform, StyleSheet } from 'react-native';

const DEFAULT_SPACING = 16;
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const setHeight = (Ios, Android) => (Platform?.OS === 'ios' ? height * Ios : height * Android);
export const setOS = (Ios, Android) => (Platform?.OS === 'ios' ? Ios : Android);
export const isValidateHeightOs = (heightMin, numberSE, numberMax) =>
    Dimensions.get('window').height === heightMin ? numberSE : numberMax;
export const isValidateWidthOs = (widthMin, numberSE, numberMax) =>
    Dimensions.get('window').width === widthMin ? numberSE : numberMax;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerCenter: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heightCenter: {
        height: 'auto',
        justifyContent: 'center',
    },
    containerDialog: {
        paddingVertical: 34,
        paddingHorizontal: 32,
        backgroundColor: '#FFF',
        borderRadius: 12,
    },
    buttonTab: {
        paddingVertical: 8,
        width: '47%',
        borderRadius: 8,
        height: 48,
        gap: 4,
    },
    indicator: {
        backgroundColor: '#D9D9D9',
        width: 61,
        height: 4,
        borderRadius: 10,
    },
    modalBottom: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    lineItem: {
        width: 61,
        height: 4,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        marginTop: 8,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    defaultMargin: {
        margin: DEFAULT_SPACING,
    },
    defaultPadding: {
        padding: DEFAULT_SPACING,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    selfCenter: {
        alignSelf: 'center',
    },
    transparent: {
        backgroundColor: 'transparent',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    boxImage: {
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    containerTab: {
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        justifyContent: 'center',
        width: width > 480 ? width * 0.25 : 'auto',
    },
    txtTab: {
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: width > 480 ? 18 : 14,
    },
    input: {
        fontSize: 14,
        color: '#686868',
        borderWidth: 0.5,
        borderColor: '#C1C1C1',
        borderRadius: 5,
        paddingVertical: 10.5,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        lineHeight: 17,
    },
    inputRegister: {
        width: '100%',
        fontSize: 12,
        color: '#686868',
        borderColor: '#C1C1C1',
        borderRadius: 5,
        borderWidth: 1,
        fontStyle: 'normal',
        lineHeight: 17,
        paddingVertical: Platform.OS == 'ios' ? 12.5 : 10.5,
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
    },

    button: {
        borderRadius: 5,
    },
    buttonBorder10: {
        backgroundColor: '#DFEDFD',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 6,
    },
    textSplash: {
        fontSize: 16,
        color: '#0066b2',
        fontWeight: 'bold',
        lineHeight: 21,
        textAlign: 'center',
    },
    text8Bold: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#686868',
        lineHeight: 11,
    },
    labelButton10: {
        color: '#1E1E1E',
        fontSize: 16,
        paddingVertical: Platform.OS == 'ios' ? 5 : 9.5,
        lineHeight: 17,
    },
    labelButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.5,
        paddingVertical: 5,
        textTransform: 'capitalize',
    },
    text10Extra: {
        fontSize: 10,
        color: '#242424',
        lineHeight: 12,
    },
    text10ExtraBold: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 12,
    },
    text14SemiBold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E1E1E',
        lineHeight: 17,
    },
    text14: {
        fontSize: 14,
        lineHeight: 17,
        color: '#242424',
    },
    text16: {
        fontSize: 16,
        lineHeight: 17,
        color: '#242424',
    },
    text11Regular: {
        fontSize: 11,
        fontWeight: '400',
        color: '#242424',
        fontStyle: 'normal',
    },
    text12Regular: {
        fontSize: 12,
        fontWeight: '400',
        color: '#242424',
        lineHeight: 17,
    },
    text13Regular: {
        fontSize: 13,
        color: '#242424',
        fontWeight: '400',
        lineHeight: 15.6,
    },
    text9Bold: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 11,
    },
    text9Regular: {
        fontSize: 9,
        fontWeight: '400',
        color: '#242424',
        lineHeight: 11,
    },
    text12Medium: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 15,
    },
    text16Bold: {
        fontSize: 16,
        color: '#242424',
        fontWeight: 'bold',
    },
    text15Bold: {
        fontSize: 15,
        color: '#242424',
        fontWeight: 'bold',
    },
    text18Bold: {
        fontSize: 16,
        color: '#242424',
        fontWeight: 'bold',
    },
    text16Regular: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#242424',
        lineHeight: 19,
    },
    text16Medium: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 17,
    },
    text16ExtraBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 19,
    },
    text20Regular: {
        fontSize: 20,

        fontWeight: '400',
        color: '#242424',
        lineHeight: 30,
    },
    text20Bold: {
        fontSize: 20,

        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 30,
    },
    text12SemiBold: {
        fontSize: 12,

        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 15,
    },
    text12Bold: {
        fontSize: 12,

        fontWeight: 'bold',
        color: '#242424',
    },
    textTitle: {
        fontSize: 16,

        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 17,
    },
    textList: {
        fontSize: 14,

        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 17,
    },
    textUnderline: {
        fontSize: 14,

        textDecorationLine: 'underline',
        lineHeight: 17,
    },
    text14Regular: {
        fontSize: 14,

        fontWeight: '400',
        color: '#242424',
        lineHeight: 19,
    },
    text18Regular: {
        fontSize: 18,

        fontWeight: '400',
        color: '#242424',
        lineHeight: 30,
    },
    text18bodySMBold: {
        fontSize: 18,

        fontWeight: '700',
        color: '#242424',
    },
    textBodyMDBold: {
        color: '#000000',
        fontWeight: '700',
        textAlign: 'center',
    },
    text14Medium: {
        fontSize: 14,

        fontWeight: 'bold',
        color: '#242424',
        lineHeight: 17,
    },

    text23Bold: {
        fontSize: 23,
        fontWeight: '700',

        color: '#FCFCFC',
        lineHeight: 27.6,
    },

    text26Bold: {
        fontSize: 26,
        fontWeight: '700',

        color: '#19181B',
    },
    textStyle: {
        fontSize: 14,
        fontWeight: '400',

        color: '#19181B',
    },

    bottomSheetContainer: {
        width: '100%',
        height: '100%',
        zIndex: 999,
        elevation: 999,
    },
    animationContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        height: '100%',
    },
    bottomSheet: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff',
    },
    touchableTransparentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,

        fontStyle: 'normal',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#1E1E1E',
    },
    titledialog: {
        fontSize: 16,

        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        textTransform: 'uppercase',
        lineHeight: 19.2,
        color: '#1E1E1E',
        width: Dimensions.get('screen').width - 100,
    },
    titleSuccess: {
        fontSize: 16,

        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('screen').width - 100,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 100,
        backgroundColor: '#0066B2',
        opacity: 0.3,
        marginLeft: 3.5,
        marginRight: 3.5,
    },
    activeDot: {
        height: 8,
        width: 16,
        borderRadius: 100,
        backgroundColor: '#0066B2',
    },
    inputDisable: {
        backgroundColor: '#E0F2FF',
    },
    header: {
        borderColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 11,
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        borderColor: '#DFEDFD',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 6,
        marginBottom: 10,
    },
    shadowButton: {
        shadowOffset: { height: 4, width: 0 },
        shadowColor: '#003F78',
        shadowOpacity: 0.12,
    },
    shadowButton_500: {
        shadowColor: '#3CACFF',
        shadowRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: { height: 0, width: 0 },
        backgroundColor: '#0066b2',
        elevation: 8,
        borderColor: 'transparent',
    },
});

export const customMapStyle = [
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
];
