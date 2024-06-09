import { Button, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import * as FileSystem from 'expo-file-system';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Path } from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import ProgressGame from '../../components/header/ProgressGame';
import baseURL from '../../services/api/baseURL';
import useNavigationService from '../../navigation/NavigationService';
import Loader from '../../components/Load/loader';


const handleSpeak = (text) => {
    Speech.speak(text,
        options = {
            voice: "com.apple.speech.synthesis.voice.Fred",
            // language: 'en-US',
            pitch: 1,
            rate: 1
        }
    )
}
const GameScreen = () => {
    const answer = useSelector((state) => state.gameReducer.selectAnswers);
    console.log('answer', answer)
    const rightAnswer = useSelector((state) => state.gameReducer.rightAnswers);
    const token = useSelector((state) => state.authReducer.token);
    const user = useSelector((state) => state.authReducer.user);
    const route = useRoute();
    const id = route.params?.id;
    console.log(id);
    const { navigate } = useNavigationService();
    const [games, setGames] = useState([]);
    const getAllGames = () => {
        axios.get(`${baseURL}/games?ProfileId=${user?.id}&TopicId=${id}`, {
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'bearer ' + token,
            }
        })
            .then((response) => {
                // console.log('response', response.data?.games)
                setGames(response.data?.games,)
            })
            .catch((error) => console.log('error', error))
    }
    const updateGame = (gameId, isCorrectAnswer) => {
        console.log('isCorrectAnswer', isCorrectAnswer)
        formData = {
            isPlayed: isCorrectAnswer
        }
        axios.patch(`${baseURL}/profiles/${user?.id}/games/${gameId}/play`, formData, {
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log('response', response.data)
        }).catch((err) => console.error('errr', err.response))
    }
    useEffect(() => {
        getAllGames();
    }, [])
    // console.log(rightAnswer)
    // console.log(answer)
    const game = [
        {
            id: 1,
            kind: 'Picture Choice', question: 'What is the capital of France?',
            options: [
                { title: 'Dog', img: 'https://i.pinimg.com/736x/f6/7d/0e/f67d0eda913232d983e24d2ad4440d96.jpg' },
                { title: 'Cat', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7WgnvCYg4a6RNT6H5hkwnAIXXFP40zWlCQ&s' },
                { title: 'Rabbit', img: 'https://img.freepik.com/free-vector/cute-rabbit-bite-carrot-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-7366.jpg' },
                { title: 'Bear', img: 'https://img.freepik.com/premium-vector/cute-cartoon-bear-illustration_490828-617.jpg' }
            ],
            rightAnswer: 'Dog'
        },
        { id: 1, kind: 'Sentence Scramble', question: 'Translate this sentence', words: ['drink', 'I', 'water', 'and', 'coffee'], rightAnswer: 'I drink coffee and water' },
        {
            id: 1,
            kind: 'Sentence Choice', question: 'The dog is brown.',
            options: [
                { title: 'The dog is brown.' },
                { title: 'The dog is black and white.' },
                { title: 'The dog is a farm animal.' },
                { title: 'The dog is the largest land animal.' }
            ],
            rightAnswer: 'The dog is brown.'
        },
        { id: 1, kind: 'Echo Repeat', question: 'Pronounce the word "Bonjour"', rightAnswer: 'I drink coffee and water' },
    ];
    const questions = [
        {
            id: "08dc813c-26a4-4fa5-8674-ba6081caa464",
            kind: "Picture Choice",
            question: "Which animal says meow?",
            rightAnswer: "Cat",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-43f1-826e-3ed82271e247",
            kind: "Picture Choice",
            question: "Which animal is known for its long neck?",
            rightAnswer: "Giraffe",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-44bb-8746-f84d9f5f5653",
            kind: "Picture Choice",
            question: "Which animal lives in the water and has fins?",
            rightAnswer: "Fish",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-44f3-89f9-33c86aa9b7ab",
            kind: "Sentence Scramble",
            question: null,
            rightAnswer: "The cat sat on the mat.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-4510-8ded-fbb4d2613e78",
            kind: "Sentence Choice",
            question: null,
            rightAnswer: "The dog is brown.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-452e-8228-9da34b22befa",
            kind: "Echo Repeat",
            question: null,
            rightAnswer: "The cow says moo.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-4542-84c1-3b138d2af0ca",
            kind: "Sentence Scramble",
            question: null,
            rightAnswer: "The horse is a mammal.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-4556-8a22-cdf8be607442",
            kind: "Sentence Choice",
            question: null,
            rightAnswer: "The pig is a farm animal.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-456e-8c5c-0d4864b79191",
            kind: "Echo Repeat",
            question: null,
            rightAnswer: "The sheep says baa.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-4582-8330-70d6f437298a",
            kind: "Sentence Scramble",
            question: null,
            rightAnswer: "The lion is the king of the jungle.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-45a8-81da-dfa89985c4c7",
            kind: "Sentence Choice",
            question: null,
            rightAnswer: "The elephant is the largest land animal.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        },
        {
            id: "08dc813c-26b0-45db-8c44-8838314f44f7",
            kind: "Echo Repeat",
            question: null,
            rightAnswer: "The monkey says ooh ooh aa aa.",
            soundFilePath: null,
            topicId: "26a0c9d0-1534-11ef-8731-02509b688cae",
            options: []
        }
    ]
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [checkAnswer, setCheckAnswer] = useState(false);
    const [isCorrectAnswer, setCorrectAnswer] = useState(null);
    const [progress, setProgress] = useState()
    const [loading, setLoading] = useState(false)
    const [correctSound, setCorrectSound] = useState();
    const [incorrectSound, setIncorrectSound] = useState();
    const handleNext = () => {
        if (currentQuestionIndex + 1 === newGames.length) {
            setLoading(true);
            setTimeout(() => {
                navigate('CompleteGame', { id: id })
                setLoading(false);
            }, 2000);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / newGames.length)
            console.log('progress', progress)
        }
    };
    useEffect(() => {
        const loadSounds = async () => {
            const correctSound = new Audio.Sound();
            const incorrectSound = new Audio.Sound();

            await correctSound.loadAsync(require('../../../assets/right-answer.mp3'));
            await incorrectSound.loadAsync(require('../../../assets/wrong-answer.mp3'));

            setCorrectSound(correctSound);
            setIncorrectSound(incorrectSound);
        };

        loadSounds();

        return () => {
            if (correctSound) {
                correctSound.unloadAsync();
            }
            if (incorrectSound) {
                incorrectSound.unloadAsync();
            }
        };
    }, []);
    const handleSound = async (isCorrect) => {
        if (isCorrect) {
            if (correctSound) {
                await correctSound.replayAsync();
            }
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
            if (incorrectSound) {
                await incorrectSound.replayAsync();
            }
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    }
    const newGames = games.filter(item => item.isPlayed !== true);
    // console.log(newGames.length);
    const questionss = newGames[currentQuestionIndex];
    const createProfileGame = () => {
        const formData = {
            profileId: user?.id,
            gameId: questionss?.id,
            isPlayed: false
        }
        axios.post(`${baseURL}/profileGames`, formData, {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => console.error('err', err))
    }
    useEffect(() => {
        createProfileGame();
    }, [questionss])
    const renderQuestion = () => {
        const question = newGames[currentQuestionIndex];
        switch (question?.kind) {
            case 'Picture Choice':
                return <MultipleChoiceQuestion
                    question={question}
                    onNext={handleNext}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                    checkAnswer={checkAnswer}
                />;
            case 'Sentence Scramble':
                return <WordOrderQuestion
                    question={question} onNext={handleNext}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                    checkAnswer={checkAnswer}
                />;
            case 'Sentence Choice':
                return <SentenceChoiceQuestion
                    question={question}
                    onNext={handleNext}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                    checkAnswer={checkAnswer}
                />;
            case 'Echo Repeat':
                return <PronunciationQuestion
                    question={question}
                    setSelectedAnswer={setSelectedAnswer}
                />;
            default:
                return null;
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: '7%' }}>
                <ProgressGame style={{ paddingHorizontal: 17 }} isIconBack progress={progress} />
            </View>
            {renderQuestion()}
            <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
                {checkAnswer && (
                    <View style={{
                        width: '100%', alignItems: 'center', backgroundColor: isCorrectAnswer ? '#f2c601' : '#ff6060',
                        height: '90%', justifyContent: 'space-around', borderTopLeftRadius: 20, borderTopRightRadius: 20
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                            <Image
                                source={isCorrectAnswer ?
                                    require('../../../assets/true.png') : require('../../../assets/false.png')}
                                style={{ width: 30, height: 30, tintColor: 'white' }}
                                resizeMode='contain'
                            />
                            <Text style={{ fontSize: 17, fontWeight: '500', color: '#FFFFFF', paddingHorizontal: 10 }}>
                                {isCorrectAnswer ? 'Correct!' : 'Wrong!'}
                            </Text>
                        </View>
                        {!isCorrectAnswer && (<View style={{ width: '90%' }}>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: '#FFFFFF', paddingHorizontal: 10 }}>
                                Correct Answer: {rightAnswer}
                            </Text>
                        </View>
                        )}
                        <TouchableOpacity style={{
                            width: '90%', height: 50,
                            backgroundColor: '#FFFFFF',
                            alignItems: 'center', justifyContent: 'center', borderRadius: 15
                        }}
                            disabled={selectedAnswer !== null ? false : true}
                            onPress={() => {
                                setCheckAnswer(false);
                                setCorrectAnswer(null)
                                setSelectedAnswer(null);
                                handleNext();
                            }}
                        >
                            <Text style={{ color: isCorrectAnswer ? '#f2c601' : '#ff6060', fontSize: 17, fontWeight: '500', }}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!checkAnswer && (
                    <TouchableOpacity style={{
                        width: '90%', height: 50, marginBottom: 10,
                        backgroundColor: selectedAnswer !== null ? '#f2c601' : '#fed57b',
                        alignItems: 'center', justifyContent: 'center', borderRadius: 15
                    }}
                        disabled={selectedAnswer !== null ? false : true}
                        onPress={() => {
                            setCheckAnswer(true);
                            setCorrectAnswer(answer === rightAnswer);
                            updateGame(questionss?.id, answer === rightAnswer)
                            handleSound(answer === rightAnswer)
                        }}
                    >
                        <Text style={{ color: '#FFFFFF' }}>Check Answer</Text>
                    </TouchableOpacity>
                )}
            </View>
            {loading ? <Loader indeterminate={loading} /> : null}
        </SafeAreaView>
    )
}
const listAllVoiceOptions = async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    console.log(voices);
};

const MultipleChoiceQuestion = ({ question, onNext, setSelectedAnswer, selectedAnswer, checkAnswer }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
    }, [question])
    const selectAnswers = (answer) => {
        dispatch({
            type: 'SELECT_ANSWER',
            selectAnswers: answer
        })
    }
    const chunk = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
    const rows = chunk(question.options, 2);
    const handleSelect = (text, index) => {
        handleSpeak(text);
        selectAnswers(text);
        setSelectedAnswer(index);
    }
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '70%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600', textAlign: 'center' }}>{question.question}</Text>
            <TouchableOpacity style={{
                width: 'auto', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between'
            }}
                onPress={() => handleSpeak(question.rightAnswer)}
            >
                <Image
                    source={require('../../../assets/speaker.png')}
                    style={{ width: 25, height: 25, tintColor: '#f2c601' }}
                />
                {/* <Text style={{ fontSize: 18, fontWeight: '500', paddingHorizontal: 10 }}>{question.rightAnswer}</Text> */}
            </TouchableOpacity>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((option, index) => {
                        // console.log('option', option)
                        const optionIndex = rowIndex * 2 + index;
                        const isSelected = optionIndex === selectedAnswer;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => { handleSelect(option.name, optionIndex) }}
                                style={[styles.option, { borderColor: isSelected ? '#f2c601' : 'gray', borderWidth: isSelected ? 3 : 1 }]}
                                disabled={checkAnswer}
                            >
                                <Image
                                    source={{ uri: option.img }}
                                    style={styles.image}
                                />
                                <Text style={styles.optionText}>{option.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            ))}
        </View>
    );
};
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
const WordOrderQuestion = ({ question, onNext, setSelectedAnswer, selectAnswer, checkAnswer }) => {
    const [selectedWords, setSelectedWords] = useState([]);
    const [unselectedWords, setUnselectedWords] = useState([]);
    const dispatch = useDispatch();

    // console.log('option:', question.options)
    const words = question.options.map(item => item.name);
    console.log('words:', words)
    useEffect(() => {
        setUnselectedWords(shuffleArray([...words]));
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
    }, [question]);
    const selectAnswers = () => {
        const userAnswerString = selectedWords.join(' ');
        dispatch({
            type: 'SELECT_ANSWER',
            selectAnswers: userAnswerString
        })
    }
    useEffect(() => {
        selectAnswers()
    }, [selectedWords])
    const handleSelectWord = (index) => {
        const word = unselectedWords[index];
        handleSpeak(word)
        setUnselectedWords(unselectedWords.filter((_, i) => i !== index));
        setSelectedWords([...selectedWords, word]);
        if (unselectedWords.length >= 0) {
            setSelectedAnswer(unselectedWords.length)
        }
    };

    const handleDeselectWord = (index) => {
        const word = selectedWords[index];
        setSelectedWords(selectedWords.filter((_, i) => i !== index));
        setUnselectedWords([...unselectedWords, word]);
        if (selectedWords.length === 1) {
            setSelectedAnswer(null)
        }
    };
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '70%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600', textAlign: 'center' }}>{question.question}</Text>
            <TouchableOpacity style={{
                width: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            }}
                onPress={() => handleSpeak(question.rightAnswer)}
            >
                <Image
                    source={require('../../../assets/speak.png')}
                    style={{ width: 130, height: 130 }}
                    resizeMode='contain'
                />
                <View style={{ width: 50, backgroundColor: '#f2c601', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../../../assets/speaker.png')}
                        style={{ width: 25, height: 25, tintColor: '#ffffff' }}
                    />
                </View>

            </TouchableOpacity>
            <View style={{ width: '90%', height: 'auto', flexDirection: 'row', borderBottomWidth: 0.2, flexWrap: 'wrap' }}>
                {selectedWords.map((word, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => handleDeselectWord(index)}
                        style={styles.wordButton}
                        disabled={checkAnswer}>
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ width: '90%', height: 'auto', flexDirection: 'row', borderBottomWidth: 0.2, flexWrap: 'wrap' }}>
                {unselectedWords.map((word, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSelectWord(index)} style={styles.wordButton}>
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
const PronunciationQuestion = ({ question, onNext, setSelectedAnswer }) => {
    const [recording, setRecording] = useState();
    const [soundUri, setSoundUri] = useState('');
    const [waveformData, setWaveformData] = useState([]);
    const intervalId = useRef(null);
    const dispatch = useDispatch();
    const [sound, setSound] = useState(null);
    const [text, setText] = useState(null);

    const token = useSelector((state) => state.authReducer.token);

    useEffect(() => {
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
    }, [question])

    useEffect(() => {
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                console.log('Interval cleared on unmount');
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                console.log('Permission to access audio recording denied');
                return;
            }

            // Cấu hình audio mode
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const recordingOptions = {
                isMeteringEnabled: true,
                android: {
                    extension: '.3gp',
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000,
                },
                ios: {
                    extension: '.m4a',
                    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
            };

            const { recording } = await Audio.Recording.createAsync(
                recordingOptions
            );

            setRecording(recording);

            intervalId.current = setInterval(() => {
                updateWaveformData();
            }, 100);
            console.log('Interval started with id:', intervalId.current);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            if (recording) {
                await recording.stopAndUnloadAsync();
                // console.log('recording', recording)
                const uri = recording.getURI();
                // const { sound, status } = await recording.createNewLoadedSoundAsync();
                // console.log('sound:', sound);
                // console.log('status:', status);
                // console.log('Recording stopped and stored at:', uri);
                setSoundUri(uri);

                // const wavUri = FileSystem.documentDirectory + 'recording.wav';
                // await FileSystem.copyAsync({ from: uri, to: wavUri });
                // console.log('Copied recording to:', wavUri);

                setRecording(null);
                setSelectedAnswer(uri)

                const { sound } = await Audio.Sound.createAsync(
                    { uri },
                    { shouldPlay: false }
                );
                // const urii = sound.source.uri;
                // console.log('uri', urii)
                setSound(sound);

                if (intervalId.current) {
                    clearInterval(intervalId.current);
                    // console.log('Interval cleared with id:', intervalId.current);
                    intervalId.current = null;
                }
            }
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };
    const updateWaveformData = () => {
        const data = Array.from({ length: 40 }, () => Math.random() * 10 - 5);
        setWaveformData(data);
        // console.log('Updated waveformData:', data);
    };

    const playSound = async () => {
        if (sound) {
            try {
                await sound.replayAsync();
            } catch (err) {
                console.error('Failed to play the sound', err);
            }
        } else {
            console.log('No sound to play');
        }
    };
    useEffect(() => {
        if (soundUri) {
            UploadAudio();
        }
    }, [soundUri])
    console.log('question?.id', question?.id)

    const UploadAudio = () => {
        const formData = new FormData();
        const audioFile = {
            uri: soundUri,
            name: Platform.OS === 'ios' ? 'recording.m4a' : 'recording.3gp',
            type: Platform.OS === 'ios' ? 'audio/x-m4a' : 'audio/3gp',
        };
        formData.append('audioFile', audioFile);
        axios.post(`${baseURL}/games/${question?.id}/upload/voice`, formData, {
            headers: {
                // 'Accept': '*/*',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data?.mediaLink)
                getText(response.data?.mediaLink)
                // setSelectedAnswer()
            }).catch((error) => {
                console.error(error.response?.data)
            })
    }
    const getText = (uri) => {
        formData = {
            wavFileGcsUri: uri
        }
        axios.post(`${baseURL}/games/voice/translateToText`, formData, {
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('data', response.data?.text)
            setText(response.data?.text)
            // selectAnswers(response.data?.text)
        }).catch((err) => {
            console.log('errorr', err)
        })
    }
    useEffect(() => {
        if (text) {
            selectAnswers(text)
        }
    }, [text])
    const selectAnswers = (answer) => {
        dispatch({
            type: 'SELECT_ANSWER',
            selectAnswers: answer
        })
    }
    const Line = ({ line }) => (
        <Path
            key={'line'}
            d={line}
            stroke={'#f2c601'}
            fill={'none'}
        />
    )
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '70%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{question.question}</Text>
            {/* Add logic to handle pronunciation */}
            <TouchableOpacity style={{ alignItems: 'center' }}
                onPress={() => handleSpeak(question.rightAnswer)}
            >
                <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, borderColor: '#f2c601' }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#f2c601' }}>{question.rightAnswer}</Text>
                </View>
                <Image
                    source={require('../../../assets/lionvoice.png')}
                    style={{ width: 200, height: 200 }}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-evenly', height: '20%' }}>
                <TouchableOpacity style={{
                    width: '21%', height: '70%', justifyContent: 'center',
                    alignItems: 'center', backgroundColor: '#f2c601', borderRadius: 10
                }}
                    onPress={recording ? stopRecording : startRecording}
                >
                    <Image
                        source={require('../../../assets/voice.png')}
                        style={{ width: 50, height: 50, tintColor: '#FFFFFF' }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text style={{ color: 'gray', fontSize: 15 }}>{!recording ? 'Tap to speak' : 'Tap to stop'}</Text>
            </View>
            {waveformData.length > 0 && (
                <AreaChart
                    style={{ height: 90, width: 300, borderWidth: 1, borderColor: '#f2c601', borderRadius: 10 }}
                    data={waveformData}
                    contentInset={{ top: 30, bottom: 20, color: '#f2c601' }}
                    curve={shape.curveNatural}
                    svg={{ fill: '#f2c601', stroke: '#f2c601' }}
                >
                    <Line />
                </AreaChart>
            )}
            {/* <Button style={styles.button} onPress={() => sound.replayAsync()} title="Play"></Button> */}
            {/* <Button title="Play Sound" onPress={playSound} disabled={!sound} /> */}
            {text && <Text style={[styles.wordText, { textAlign: 'center' }]}>You said: {text}</Text>}
        </View>
    );
};
const SentenceChoiceQuestion = ({ question, onNext, setSelectedAnswer, selectedAnswer, checkAnswer }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
    }, [question])
    const selectAnswers = (answer) => {
        dispatch({
            type: 'SELECT_ANSWER',
            selectAnswers: answer
        })
    }
    const handleSelect = (text, index) => {
        handleSpeak(text);
        selectAnswers(text);
        setSelectedAnswer(index);
    }
    // console.log('question.options', question.options)
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '70%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600', textAlign: 'center', width: '80%' }}>{question.question}</Text>
            <TouchableOpacity style={{
                width: 'auto', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between'
            }}
                onPress={() => handleSpeak(question.rightAnswer)}
            >
                <Image
                    source={require('../../../assets/speaker.png')}
                    style={{ width: 25, height: 25, tintColor: '#f2c601' }}
                />
                {/* <Text style={{ fontSize: 18, fontWeight: '500', paddingHorizontal: 10 }}>{question.rightAnswer}</Text> */}
            </TouchableOpacity>
            {question.options.map((option, index) => (
                <TouchableOpacity key={index} style={[styles.optionRow,
                { borderWidth: selectedAnswer === index ? 3 : 1, borderColor: selectedAnswer === index ? '#f2c601' : 'gray' }]}
                    onPress={() => handleSelect(option?.name, index)}
                    disabled={checkAnswer}
                >
                    <Text style={styles.optionText}>{option?.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default GameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        width: '95%'
    },
    option: {
        alignItems: 'center',
        width: '45%',
        height: '100%',
        borderRadius: 15,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
        height: '30%',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    wordButton: {
        margin: 5,
        padding: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
    },
    wordText: {
        fontSize: 16,
        fontWeight: '500'
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fill: {
        flex: 1,
        margin: 16
    },
    button: {
        margin: 16
    },
    optionRow: {
        width: '90%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
})