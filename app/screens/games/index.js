import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux'

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
    const rightAnswer = useSelector((state) => state.gameReducer.rightAnswers);
    // console.log(rightAnswer)
    // console.log(answer)
    const game = [
        {
            id: 1,
            Kind: 'Picture Choice',
            Question: 'Which animal says meow?',
            RightAnswer: 'Cat',
            SoundFilePath: '',
            TopicId: '',
        },
        {
            id: 2,
            Kind: 'Sentence Scramble',
            Question: '',
            RightAnswer: 'The cat sat on the mat.',
            SoundFilePath: '',
            TopicId: '',
        },
        {
            id: 3,
            Kind: '',
            Question: '',
            RightAnswer: '',
            SoundFilePath: '',
            TopicId: '',
        }
    ]
    const questions = [
        {
            type: 'multiple-choice', question: 'What is the capital of France?',
            options: [
                { title: 'Dog', img: 'https://i.pinimg.com/736x/f6/7d/0e/f67d0eda913232d983e24d2ad4440d96.jpg' },
                { title: 'Cat', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7WgnvCYg4a6RNT6H5hkwnAIXXFP40zWlCQ&s' },
                { title: 'Rabbit', img: 'https://img.freepik.com/free-vector/cute-rabbit-bite-carrot-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-7366.jpg' },
                { title: 'Bear', img: 'https://img.freepik.com/premium-vector/cute-cartoon-bear-illustration_490828-617.jpg' }
            ],
            rightAnswer: 'Dog'
        },
        { type: 'word-order', question: 'Translate this sentence', words: ['drink', 'I', 'water', 'and', 'coffee'], rightAnswer: 'I drink coffee and water' },
        {
            type: 'Sentence Choice', question: 'The dog is brown.',
            options: [
                { title: 'The dog is brown.' },
                { title: 'The dog is black and white.' },
                { title: 'The dog is a farm animal.' },
                { title: 'The dog is the largest land animal.' }
            ],
            rightAnswer: 'The dog is brown.'
        },
        { type: 'pronunciation', question: 'Pronounce the word "Bonjour"', rightAnswer: 'I drink coffee and water' },
    ];
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [checkAnswer, setCheckAnswer] = useState(false);
    const [isCorrectAnswer, setCorrectAnswer] = useState(null);
    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };
    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        switch (question.type) {
            case 'multiple-choice':
                return <MultipleChoiceQuestion
                    question={question}
                    onNext={handleNext}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswer}
                    checkAnswer={checkAnswer}
                />;
            case 'word-order':
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
            case 'pronunciation':
                return <PronunciationQuestion question={question} onNext={handleNext} />;
            default:
                return null;
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            {renderQuestion()}
            <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'flex-end', borderWidth: 1 }}>
                {checkAnswer && (
                    <View style={{
                        width: '100%', alignItems: 'center', backgroundColor: isCorrectAnswer ? '#f2c601' : '#ff6060',
                        height: '80%', justifyContent: 'space-around', borderTopLeftRadius: 20, borderTopRightRadius: 20
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
                            <Text style={{ color: isCorrectAnswer ? '#f2c601' : '#ff6060', fontSize: 17, fontWeight: '500', }}>Continue</Text>
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
                        }}
                    >
                        <Text style={{ color: '#FFFFFF' }}>Check Answer</Text>
                    </TouchableOpacity>
                )}
            </View>
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
    }, [])
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
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '75%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{question.question}</Text>
            <TouchableOpacity style={{
                width: 'auto', flexDirection: 'row', alignItems: 'center',
                alignSelf: 'flex-start', justifyContent: 'space-between'
            }}
                onPress={() => handleSpeak(question.rightAnswer)}
            >
                <Image
                    source={require('../../../assets/speaker.png')}
                    style={{ width: 25, height: 25, tintColor: '#f2c601' }}
                />
                <Text style={{ fontSize: 18, fontWeight: '500', paddingHorizontal: 10 }}>{question.rightAnswer}</Text>
            </TouchableOpacity>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((option, index) => {
                        const optionIndex = rowIndex * 2 + index;
                        const isSelected = optionIndex === selectedAnswer;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => { handleSelect(option.title, optionIndex) }}
                                style={[styles.option, { borderColor: isSelected ? '#f2c601' : 'gray', borderWidth: isSelected ? 3 : 1 }]}
                                disabled={checkAnswer}
                            >
                                <Image
                                    source={{ uri: option.img }}
                                    style={styles.image}
                                />
                                <Text style={styles.optionText}>{option.title}</Text>
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

    useEffect(() => {
        setUnselectedWords(shuffleArray([...question.words]));
        dispatch({
            type: 'RIGHT_ANSWER',
            rightAnswers: question.rightAnswer
        })
    }, []);
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
        if (unselectedWords.length === 1) {
            setSelectedAnswer(unselectedWords.length)
        }
    };

    const handleDeselectWord = (index) => {
        const word = selectedWords[index];
        setSelectedWords(selectedWords.filter((_, i) => i !== index));
        setUnselectedWords([...unselectedWords, word]);
        if (selectedWords.length <= 5) {
            setSelectedAnswer(null)
        }
    };
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '70%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{question.question}</Text>
            <TouchableOpacity style={{
                width: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
            }}
                onPress={() => handleSpeak(question.rightAnswer)}
            >
                <Image
                    source={require('../../../assets/speak.png')}
                />
                <View style={{ width: 50, backgroundColor: '#f2c601', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../../../assets/speaker.png')}
                        style={{ width: 25, height: 25, tintColor: '#ffffff' }}
                    />
                </View>

            </TouchableOpacity>
            <View style={{ width: '90%', height: '10%', flexDirection: 'row', borderBottomWidth: 0.2 }}>
                {selectedWords.map((word, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => handleDeselectWord(index)}
                        style={styles.wordButton}
                        disabled={checkAnswer}>
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ width: '90%', height: '10%', flexDirection: 'row', borderBottomWidth: 0.2 }}>
                {unselectedWords.map((word, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSelectWord(index)} style={styles.wordButton}>
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
const PronunciationQuestion = ({ question, onNext }) => {
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);
    const [message, setMessage] = useState("");
    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                setMessage("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }
    const stopRecording = async () => {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        console.log('recording:', recording)
        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);
    }
    const getDurationFormatted = (millis) => {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }
    const getRecordingLines = () => {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index} style={styles.row1}>
                    <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
                    <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
                    <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
                </View>
            );
        });
    }
    console.log('recordings:', recordings)
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
                <Text style={{ color: 'gray', fontSize: 15 }}>Tap to speak</Text>
            </View>
            {/* {getRecordingLines()} */}
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
    }, [])
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
    return (
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '90%', height: '75%' }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{question.question}</Text>
            <TouchableOpacity style={{
                width: 'auto', flexDirection: 'row', alignItems: 'center',
                alignSelf: 'flex-start', justifyContent: 'space-between'
            }}
                onPress={() => handleSpeak(question.rightAnswer)}
            >
                <Image
                    source={require('../../../assets/speaker.png')}
                    style={{ width: 25, height: 25, tintColor: '#f2c601' }}
                />
                <Text style={{ fontSize: 18, fontWeight: '500', paddingHorizontal: 10 }}>{question.rightAnswer}</Text>
            </TouchableOpacity>
            {question.options.map((option, index) => (
                <TouchableOpacity key={index} style={[styles.optionRow,
                { borderWidth: selectedAnswer === index ? 3 : 1, borderColor: selectedAnswer === index ? '#f2c601' : 'gray' }]}
                    onPress={() => handleSelect(option.title, index)}
                    disabled={checkAnswer}
                >
                    <Text style={styles.optionText}>{option.title}</Text>
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