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


const GameScreen = () => {
    const answer = useSelector((state) => state.gameReducer.selectAnswers);
    const rightAnswer = useSelector((state) => state.gameReducer.rightAnswers);
    // console.log('answer', answer)
    // console.log('rightAnswer', rightAnswer)
    const token = useSelector((state) => state.authReducer.token);
    const user = useSelector((state) => state.authReducer.user);
    const route = useRoute();
    const id = route.params?.id;
    const reset = route.params?.reset;
    // console.log('reset', reset);
    // console.log(user?.id)
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
                // console.log('response:s', response.data?.games)
                const updatedGames = response.data?.games.map(item => {
                    if (item.isRepeat) {
                        return { ...item, isRepeat: false };
                    }
                    return item;
                });
                console.log('response:s', updatedGames)
                setGames(updatedGames)
            })
            .catch((error) => console.log('error1:', error.response))
    }
    const getAllGamesError = () => {
        axios.get(`${baseURL}/games/repeat?ProfileId=${user?.id}&TopicId=${id}`, {
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'bearer ' + token,
            }
        })
            .then((response) => {
                console.log('response1:', response.data?.games)
                if (response.data?.games.length === 0) {
                    navigate('CompleteGame', { id: id })
                } else {
                    setGames(response.data?.games)
                }
            })
            .catch((error) => console.log('error2:', error.response))
    }
    const updateGame = (gameId, isCorrectAnswer) => {
        console.log('isCorrectAnswer', isCorrectAnswer)
        if (!state) {
            formData = {
                profileId: user?.id,
                gameId: gameId,
                isPlayed: isCorrectAnswer
            }
            axios.patch(`${baseURL}/profileGames/play`, formData, {
                headers: {
                    'Accept': 'text/plain',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json-patch+json',
                }
            }).then((response) => {
                console.log('response', response.data)
            }).catch((err) => console.error('errr', err.response))
        } else {
            if (isCorrectAnswer) {
                formData = {
                    profileId: user?.id,
                    gameId: gameId,
                    isRepeat: isCorrectAnswer
                }
                axios.patch(`${baseURL}/profileGames/repeat`, formData, {
                    headers: {
                        'Accept': 'text/plain',
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json-patch+json',
                    }
                }).then((response) => {
                    console.log('response1', response.data)
                }).catch((err) => console.error('errr', err.response))
            }
            // if (isCorrectAnswer) {
            //     const newGames = games.filter(question => question.id !== gameId);
            //     setGames([])
            //     setGames(newGames)
            // }
        }
    }
    useEffect(() => {
        getAllGames()
    }, [])
    useEffect(() => {
        if (reset) {
            console.log('ccccc')
            setGames([])
            getAllGamesError()
            setCurrentQuestionIndex(0)
        }
    }, [reset])
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [checkAnswer, setCheckAnswer] = useState(false);
    const [isCheckAnswer, setIsCheckAnswer] = useState(null)
    const [isCorrectAnswer, setCorrectAnswer] = useState(null);
    const [progress, setProgress] = useState()
    const [loading, setLoading] = useState(false)
    const [correctSound, setCorrectSound] = useState();
    const [incorrectSound, setIncorrectSound] = useState();
    const [sound, setSound] = useState(null);
    const [state, setState] = useState(false)
    console.log('state', state)
    const handleNext = () => {
        if (currentQuestionIndex + 1 === games.length) {
            if (!state) {
                setLoading(true);
                setTimeout(() => {
                    // getAllGames()
                    // setCurrentQuestionIndex(0)
                    setProgress()
                    navigate('Mistakes', { id: id })
                    setState(true)
                    console.log('bbbbb')
                    setLoading(false);
                }, 2000);
            } else {
                // if (games.length > 0) {
                console.log('aaaa')
                setGames([])
                console.log('game:', games)
                getAllGamesError()
                setCurrentQuestionIndex(0)
                setProgress()
                // } else {
                //     navigate('CompleteGame', { id: id })
                // }
            }
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / games.length)
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
    const saveBase64Audio = async (base64String, fileName) => {
        const fileUri = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, base64String, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return fileUri;
    };

    const generateVoice = async (text) => {
        try {
            const response = await axios.post(`${baseURL}/games/synthesizeSpeech?Text=${text}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'text/plain'
                }
            });

            const base64Audio = response.data?.fileContents;
            if (base64Audio) {
                const fileUri = await saveBase64Audio(base64Audio, 'audio.mp3');
                return fileUri;
            } else {
                throw new Error('No audio data received');
            }
        } catch (error) {
            console.log('Error generating voice:', error);
        }
    };
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);
    const playSound = async (fileUri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };
    const handlePress = async (text) => {
        const fileUri = await generateVoice(text);
        if (fileUri) {
            await playSound(fileUri);
        }
    };
    // const games = games.filter(item => item.isPlayed !== true);
    const questionss = games[currentQuestionIndex];
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
        if (!state && questionss?.isPlayed === null) {
            createProfileGame();
        }
    }, [questionss, state])
    const renderQuestion = () => {
        const question = games[currentQuestionIndex];
        switch (question?.kind) {
            case 'Picture Choice':
                return <MultipleChoiceQuestion
                    question={question}
                    onNext={handleNext}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                    checkAnswer={checkAnswer}
                    handlePress={handlePress}
                />;
            case 'Sentence Scramble':
                return <WordOrderQuestion
                    question={question} onNext={handleNext}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                    checkAnswer={checkAnswer}
                    handlePress={handlePress}
                />;
            case 'Sentence Choice':
                return <SentenceChoiceQuestion
                    question={question}
                    onNext={handleNext}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                    checkAnswer={checkAnswer}
                    handlePress={handlePress}
                />;
            case 'Echo Repeat':
                return <PronunciationQuestion
                    question={question}
                    setSelectedAnswer={setSelectedAnswer}
                    handlePress={handlePress}
                    checkAnswer={checkAnswer}
                    setCheckAnswer={setCheckAnswer}
                    setCorrectAnswer={setCorrectAnswer}
                    updateGame={updateGame}
                    handleSound={handleSound}
                />;
            case 'Foreign Sentence Scramble':
                return <ForeignSentenceScramble
                    question={question}
                    setSelectedAnswer={setSelectedAnswer}
                    handlePress={handlePress}
                    checkAnswer={checkAnswer}
                />;
            case 'Fill Blank':
                return <FillBlank
                    question={question}
                    setSelectedAnswer={setSelectedAnswer}
                    handlePress={handlePress}
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
                                Đáp án đúng: {rightAnswer}
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
                                Tiếp tục
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
                        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 17 }}>Kiểm tra</Text>
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

const MultipleChoiceQuestion = ({ question, onNext, setSelectedAnswer, selectedAnswer, checkAnswer, handlePress }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
        handlePress(question?.rightAnswer)
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
        if (checkAnswer) {
            handlePress(text)
        } else {
            selectAnswers(text);
            setSelectedAnswer(index);
        }
    }
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '70%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600', textAlign: 'center' }}>{question.question}</Text>
            <TouchableOpacity style={{
                width: 'auto', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between'
            }}
                onPress={() => handlePress(question.rightAnswer)}
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
                            // disabled={checkAnswer}
                            >
                                <Image
                                    source={{ uri: option?.photoFilePath }}
                                    style={styles.image}
                                />
                                {/* <Text style={styles.optionText}>{option.name}</Text> */}
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
const WordOrderQuestion = ({ question, onNext, setSelectedAnswer, selectAnswer, checkAnswer, handlePress }) => {
    const [selectedWords, setSelectedWords] = useState([]);
    const [unselectedWords, setUnselectedWords] = useState([]);
    const dispatch = useDispatch();
    // console.log('question', question)
    // console.log('option:', question.options)
    const words = question.options.map(item => item.name);
    useEffect(() => {
        setUnselectedWords(shuffleArray([...words]));
        setSelectedWords([])
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
        handlePress(question.rightAnswer)
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
        handlePress(word)
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
                onPress={() => handlePress(question.rightAnswer)}
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
            <View style={styles.selectWords}>
                {selectedWords.map((word, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => handleDeselectWord(index)}
                        style={styles.wordButton}
                        disabled={checkAnswer}>
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.selectWords}>
                {unselectedWords.map((word, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSelectWord(index)}
                        style={styles.wordButton}
                        disabled={checkAnswer}>
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
const PronunciationQuestion = ({ question, setSelectedAnswer, handleSound, handlePress, setCheckAnswer, setCorrectAnswer, updateGame }) => {
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
        setWaveformData([])
        setText(null)
        handlePress(question.rightAnswer)
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
                const uri = recording.getURI();
                setSoundUri(uri);

                setRecording(null);
                // setSelectedAnswer(uri)

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
    };

    useEffect(() => {
        if (soundUri) {
            UploadAudio();
        }
    }, [soundUri])

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
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data?.mediaLink)
                compare(response.data?.mediaLink)
                // getText(response.data?.mediaLink)
                // setSelectedAnswer()
            }).catch((error) => {
                console.error(error.response?.data)
            })
    }
    const [similarity, setSimilarity] = useState(null)
    console.log('id:', question?.id)
    const compare = (uri) => {
        formData = {
            wavFileGcsUri: uri,
            rightAnswer: question.rightAnswer
        }
        axios.post(`${baseURL}/games/voice/similarity`, formData, {
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('response', response.data)
            setText(response.data?.text)
            setCheckAnswer(true)
            setCorrectAnswer(response.data?.similarity)
            updateGame(question?.id, response.data?.similarity)
            setSimilarity(response.data?.similarity)
            handleSound(response.data?.similarity)
            setSelectedAnswer(response.data)
        }).catch((error) => {
            console.log('error', error)
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
                onPress={() => handlePress(question.rightAnswer)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 'auto', justifyContent: 'space-between' }}>
                    <Image
                        source={require('../../../assets/speaker.png')}
                        style={{ width: 25, height: 25, tintColor: '#f2c601' }}
                    />
                    <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, borderColor: '#f2c601' }}>
                        <Text style={{ fontSize: 17, fontWeight: '600', color: '#f2c601', textAlign: 'center' }}>
                            {question.rightAnswer}
                        </Text>
                    </View>
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
                // disabled={soundUri !== '' ? true : false}
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
            {text && similarity !== null && <Text style={[styles.wordText,
            { textAlign: 'center', color: similarity ? '#f2c601' : 'red' }]}>
                Bạn nói: {text}
            </Text>}
        </View>
    );
};
const SentenceChoiceQuestion = ({ question, onNext, setSelectedAnswer, selectedAnswer, checkAnswer, handlePress }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
        handlePress(question.rightAnswer)
    }, [question])
    const selectAnswers = (answer) => {
        dispatch({
            type: 'SELECT_ANSWER',
            selectAnswers: answer
        })
    }
    const handleSelect = (text, index) => {
        handlePress(text)
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
                onPress={() => handlePress(question.rightAnswer)}
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
const FillBlank = ({ question, onNext, setSelectedAnswer, handlePress }) => {
    const parts = question?.rightAnswer.split(' ');
    const blankPosition = question?.options[0]?.blankPosition - 1;
    const partMiss = parts[blankPosition];
    const [selectedWords, setSelectedWords] = useState(Array(parts.length).fill(null));
    const [unselectedWords, setUnselectedWords] = useState(parts.filter(word => word !== partMiss));
    const dispatch = useDispatch();

    const words = question.options.map(item => item.name);
    console.log('words', words)
    useEffect(() => {
        setUnselectedWords(shuffleArray([...words]));
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        });
        handlePress(question.rightAnswer)
    }, [question]);

    const selectAnswers = (string) => {
        dispatch({
            type: 'SELECT_ANSWER',
            selectAnswers: string
        })
    }
    useEffect(() => {
        // Reset state when question changes
        setSelectedWords(Array(parts.length).fill(null));
        // setUnselectedWords(parts.filter(word => word !== partMiss));
    }, [question]);
    useEffect(() => {
        const newString = parts.map((word, index) =>
            index === blankPosition ? (selectedWords[index] || '_________') : word
        ).join(' ');
        selectAnswers(newString)
    }, [selectedWords, question, unselectedWords]);

    const handleSelectWord = (index) => {
        const newSelectedWords = [...selectedWords];
        newSelectedWords[blankPosition] = unselectedWords[index];
        const newUnselectedWords = unselectedWords.filter((_, i) => i !== index);
        setSelectedAnswer(index)
        setSelectedWords(newSelectedWords);
        setUnselectedWords(newUnselectedWords);
    };

    const handleDeselectWord = (index) => {
        if (index === blankPosition && selectedWords[index]) {
            const newUnselectedWords = [...unselectedWords, selectedWords[index]];
            const newSelectedWords = [...selectedWords];
            newSelectedWords[index] = null;
            setSelectedAnswer(null)
            setSelectedWords(newSelectedWords);
            setUnselectedWords(newUnselectedWords);
        }
    };

    const hasSelectedWord = selectedWords[blankPosition] !== null;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '70%' }}>
            <View style={{ width: '100%' }}>
                <Text style={styles.questionText}>{question.question}</Text>
                <TouchableOpacity style={{
                    width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                }}
                    onPress={() => handlePress(question.rightAnswer)}
                >
                    <Image
                        source={require('../../../assets/speak.png')}
                        style={{ width: 180, height: 180 }}
                        resizeMode='contain'
                    />
                    <View style={{ width: 50, backgroundColor: '#f2c601', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../../assets/speaker.png')}
                            style={{ width: 25, height: 25, tintColor: '#ffffff' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ width: '90%', height: 'auto', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                {parts.map((word, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => handleDeselectWord(index)}
                        style={[styles.wordButton, { backgroundColor: index === blankPosition && selectedWords[index] ? '#ff5733' : '#fecacb' }]}
                    // disabled={checkAnswer}
                    >
                        <Text style={[styles.wordText, { color: index === blankPosition && selectedWords[index] ? '#fff' : '#000' }]}>
                            {index === blankPosition ? (selectedWords[index] || '_________') : word}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{
                width: '90%', height: 'auto', flexDirection: 'row', flexWrap: 'wrap',
                justifyContent: 'space-evenly', borderBottomWidth: 0.2
            }}>
                {unselectedWords.map((word, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        handleSelectWord(index)
                        handlePress(word)
                    }}
                        style={[styles.wordButton, { backgroundColor: '#f2c601' }]}
                        disabled={hasSelectedWord}
                    >
                        <Text style={[styles.wordText, { color: 'white' }]}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

}
const ForeignSentenceScramble = ({ question, checkAnswer, setSelectedAnswer, handlePress }) => {
    const [selectedWords, setSelectedWords] = useState([]);
    const [unselectedWords, setUnselectedWords] = useState([]);
    const dispatch = useDispatch();

    const words = question.options.map(item => item.name);
    useEffect(() => {
        setUnselectedWords(shuffleArray([...words]));
        setSelectedWords([])
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
        handlePress(question.question)
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
            <Text style={{ fontSize: 17, fontWeight: '600', textAlign: 'center' }}>{'Dịch câu này'}</Text>
            <View>
                <TouchableOpacity style={{
                    width: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                }}
                    onPress={() => handlePress(question.question)}
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
                <Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center' }}>{question.question}</Text>
            </View>
            <View style={{
                width: '90%', height: 'auto', flexDirection: 'row', borderBottomWidth: 0.2,
                flexWrap: 'wrap', justifyContent: 'center'
            }}>
                {selectedWords.map((word, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => handleDeselectWord(index)}
                        style={styles.wordButton}
                        disabled={checkAnswer}
                    >
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{
                width: '90%', height: 'auto', flexDirection: 'row', borderBottomWidth: 0.2,
                flexWrap: 'wrap', justifyContent: 'center'
            }}>
                {unselectedWords.map((word, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => handleSelectWord(index)}
                        style={styles.wordButton}
                        disabled={checkAnswer}>
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 15
    },
    wordButton: {
        margin: 5,
        padding: 10,
        backgroundColor: '#f2c601',
        borderRadius: 5,
    },
    wordText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
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
    questionText: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20
    },
    sentenceText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    blankSpace: {
        fontSize: 16,
        fontWeight: '500',
        color: 'gray'
    },
    selectedWordContainer: {
        backgroundColor: '#f2c601',
        borderRadius: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5
    },
    selectedWordText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    },
    choicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    choiceButton: {
        backgroundColor: '#00CC00',
        borderRadius: 10,
        padding: 10,
        margin: 5
    },
    choiceText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    },
    selectWords: {
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})