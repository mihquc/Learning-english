import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

const Info = () => {
    const user = useSelector((state) => state.authReducer.user);
    const account = useSelector((state) => state.authReducer.account);
    return (
        <View style={styles.container}>
            <View style={{ borderWidth: 1, borderRadius: 11 }}>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 10, }}
                    source={{ uri: (user?.avatarFilePath == ' ' || !user?.avatarFilePath ? 'https://i.postimg.cc/Bv2nscWb/icon-default-avatar.png' : user?.avatarFilePath) }}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.view}>
                <Image
                    source={require('../../../assets/icon_person.png')}
                    style={styles.icon}
                    resizeMode='contain'
                />
                <Text style={styles.text}>{account?.userName}</Text>
            </View>
            <View style={styles.view}>
                <Image
                    source={require('../../../assets/gift.png')}
                    style={styles.icon}
                    resizeMode='contain'
                />
                <Text style={styles.text}>{moment(user?.birthday).format('DD MMM, YYYY')}</Text>
            </View>
            <View style={styles.view}>
                <Image
                    source={require('../../../assets/mail.png')}
                    style={styles.icon}
                    resizeMode='contain'
                />
                <Text style={styles.text}>{account?.email}</Text>
            </View>

        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    view: {
        flexDirection: 'row', alignItems: 'center', height: '7%', width: '90%', backgroundColor: '#fecacb',
        borderRadius: 15, shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2, shadowColor: '#000000', shadowRadius: 10,
        elevation: 3, marginVertical: 10
    },
    icon: { width: 20, height: 20, tintColor: 'red', marginLeft: 10 },
    text: { fontSize: 16, fontWeight: '500', padding: 10 },
})