import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import {Canvas, PaintStyle, Path, Skia, StrokeCap} from '@shopify/react-native-skia';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEraser, faForward, faTimes} from "@fortawesome/free-solid-svg-icons";
import styles from './DrawScreen.styles';
import {fetchGuessWords} from "../../utils/GuessWords.ts";
import {Point, Stroke} from "../../model/types";
import {DrawScreenNavigationProp, DrawScreenRouteProp} from "../../navigation/navigation.ts";

const MAX_TIME = 20;
const PHASE_COUNT = 6;
const MAX_SCORE_PER_ROUND = 100;

type DrawScreenProps = {
    navigation: DrawScreenNavigationProp;
    route: DrawScreenRouteProp;
};

const DrawScreen: React.FC<DrawScreenProps> = ({navigation, route}) => {
    const [paths, setPaths] = useState<Point[][]>([]);
    const [recognizedGuesses, setRecognizedGuesses] = useState<string[]>([]);
    const [roundScore, setRoundScore] = useState<number>(0);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [currentPhase, setCurrentPhase] = useState<number>(1);
    const [drawingTime, setDrawingTime] = useState<number>(MAX_TIME);
    const startGuessing = useRef(false);
    const guessInterval = useRef<number | null>(null);
    const {objectName, currentProgress} = route.params;

    useEffect(() => {
        guessInterval.current = setInterval(intervalFunction, 2000) as unknown as number;
        return () => clearInterval(guessInterval.current as number);
    }, [paths]);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setDrawingTime(time => {
                if (time === 1) {
                    handleEndOfRound();
                }
                return time > 0 ? time - 1 : 0;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [currentPhase]);

    const handleEndOfRound = () => {
        setTotalScore(prevTotal => prevTotal + roundScore);
        if (currentPhase === PHASE_COUNT) {
            console.log("here we jump to finish screen");
            console.log({totalScore});
            const roundsData = null;
            navigation.navigate('FinishScreen', {
                totalScore: totalScore,
                rounds: roundsData // Assume roundsData is an array of objects containing round details
            });
        } else {
            setRoundScore(0);
            setCurrentPhase(prevPhase => prevPhase + 1);
            setDrawingTime(MAX_TIME);
            navigation.navigate('Home', {newProgress: currentProgress + 1});
        }
    };

    const intervalFunction = async () => {
        if (startGuessing.current && drawingTime > 0) {
            try {
                const structuredInkData = structureInkData(paths);
                const newGuess = await guessWord(structuredInkData, drawingTime);
                setRecognizedGuesses([newGuess]);
                if (newGuess.includes(objectName)) {
                    if (guessInterval.current != null) {
                        clearInterval(guessInterval.current);
                    }
                    startGuessing.current = false;
                    setRoundScore(calculateScore(drawingTime));
                    handleEndOfRound();
                }
            } catch (error) {
                console.error("Error getting new guess:", error);
            }
        }
    };

    const calculateScore = (timeLeft: number) => {
        return Math.round((timeLeft / MAX_TIME) * MAX_SCORE_PER_ROUND);
    };

    const structureInkData = (paths: Stroke[]) => {
        return paths.map(path => {
            const xCoords = path.map(point => point.x);
            const yCoords = path.map(point => point.y);
            const baseTime = path[0].time;
            const timestamps = path.map(point => point.time - baseTime);
            return [xCoords, yCoords, timestamps];
        });
    };

    const guessWord = async (drawnPaths: string | any[], timeLeft: number) => {
        if (!Array.isArray(drawnPaths) || drawnPaths.length === 0 || !Array.isArray(drawnPaths[0])) {
            return "Invalid input";
        }

        try {
            const guesses = await fetchGuessWords(drawnPaths);
            const randomGuess = guesses[Math.floor(Math.random() * guesses.length)];
            return `${randomGuess} (${calculateScore(timeLeft)})`;
        } catch (error) {
            return "Error fetching guess";
        }
    };

    const panGesture = Gesture.Pan()
        .onStart((event) => {
            const newPoint: Point = {x: event.x, y: event.y, time: Date.now()};
            setPaths([...paths, [newPoint]]);
            startGuessing.current = true;
        })
        .onUpdate((event) => {
            const newPoint: Point = {x: event.x, y: event.y, time: Date.now()};
            setPaths(currentPaths =>
                currentPaths.map((path, index) =>
                    index === currentPaths.length - 1 ? [...path, newPoint] : path
                )
            );
        })
        .onEnd(() => {
        })
        .minPointers(1)
        .maxPointers(1)
        .minDistance(1);

    const clearPaths = () => {
        setPaths([]);
        setRecognizedGuesses([]);
    };

    const strokePaint = Skia.Paint();
    strokePaint.setAntiAlias(true);
    strokePaint.setStyle(PaintStyle.Stroke);
    strokePaint.setStrokeWidth(3);
    strokePaint.setStrokeCap(StrokeCap.Round);
    strokePaint.setColor(Skia.Color('#000000'));

    return (
        <GestureHandlerRootView style={StyleSheet.absoluteFill}>
            <GestureDetector gesture={panGesture}>
                <View style={styles.container}>
                    <Canvas style={styles.canvas}>
                        {paths.map((path, index) => {
                            const pathString = path.reduce((acc, point, idx) => {
                                return acc + `${idx === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
                            }, '');
                            const skiaPath = Skia.Path.MakeFromSVGString(pathString);
                            return skiaPath ? <Path key={index} path={skiaPath} paint={strokePaint}/> : null;
                        })}
                    </Canvas>
                    <View style={styles.topBar}>
                        <Text>Time left: {drawingTime}</Text>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
                            <FontAwesomeIcon icon={faTimes} size={32} color="#666"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
                            <FontAwesomeIcon icon={faForward} size={32} color="#666"/>
                        </TouchableOpacity>
                        <View style={styles.guessesPanel}>
                            {recognizedGuesses.map((guess, index) => (
                                <Text key={index} style={styles.guess}>{guess}</Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.bottomBar}>
                        <TouchableOpacity style={styles.actionButton} onPress={clearPaths}>
                            <FontAwesomeIcon icon={faEraser} size={32} color="#666"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

export default DrawScreen;
