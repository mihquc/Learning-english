import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProgressBar from 'react-native-progress/Bar';
import useNavigationService from '../../navigation/NavigationService';

const ProgressPlay = ({ }) => {
    const { navigate } = useNavigationService();
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        let interval;
        if (progress < 1) {
            interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 0.1, 1));
            }, 200);
        } else {
            clearInterval(interval);
            navigate('GameScreen', {});
        }
        return () => clearInterval(interval);
    }, [progress, navigate]);
    return (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
            <Image
                source={require('../../../assets/playgame.png')}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.text}>Ready to learn English.....</Text>
            <ProgressBar
                progress={progress}
                width={300}
                height={10}
                borderRadius={6}
                color={'#69b900'}
                unfilledColor={'#FFFFFF'}
                borderColor={'#FFFFFF'}
            />
        </View>
    )
}

export default ProgressPlay

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    text: {
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 20,
        color: '#f2c601',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
})