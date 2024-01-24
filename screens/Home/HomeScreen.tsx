// HomeScreen.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Button from '../../components/Button/Button';
import styles from './HomeScreen.styles';
import {HomeScreenNavigationProp, HomeScreenRouteProp} from '../../navigation/navigation.ts';
import words from '../../data/words.json';
import {useFocusEffect, useRoute} from '@react-navigation/native';

type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
    const [currentWord, setCurrentWord] = useState('');
    const [progress, setProgress] = useState(1);
    const route = useRoute<HomeScreenRouteProp>();

    useEffect(() => {
        if (progress >= 6) {
            navigation.navigate('FinishScreen');
        }
    }, [progress, navigation]);

    useFocusEffect(
        useCallback(() => {
            if (route.params?.newProgress !== undefined) {
                setProgress(route.params.newProgress);
                pickRandomWord();
            } else {
                pickRandomWord();
            }
        }, [route.params])
    );

    const pickRandomWord = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(randomWord);
    };

    const handleStartDrawing = () => {
        navigation.navigate('DrawScreen', {objectName: currentWord, currentProgress: progress});
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressBar}>
                <Text style={styles.header}>
                    Progress: {progress} / 6
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.instruction}>
                    Draw this object:
                </Text>
                <Text style={styles.objectName}>
                    {currentWord}
                </Text>
                <Button title="Start Drawing" onPress={handleStartDrawing}/>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
