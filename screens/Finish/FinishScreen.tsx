import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {FinishScreenNavigationProp, FinishScreenRouteProp} from '../../navigation/navigation.ts';

type FinishScreenProps = {
    navigation: FinishScreenNavigationProp;
    route: FinishScreenRouteProp;
};

const FinishScreen: React.FC<FinishScreenProps> = ({navigation, route}) => {
    const {totalScore, rounds} = route.params;

    const handleRestart = () => {
        // Reset scores and progress here
        navigation.navigate('Home', {newProgress: 1});
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <Text>Total Score: {totalScore}</Text>
                </View>
                {rounds.map((round, index) => (
                    <View key={index}>
                        <View style={{alignItems: 'center'}}>
                            {/* Replace with actual canvas preview */}
                            <Text>Canvas Preview {index + 1}</Text>
                        </View>
                        <Text>Round Score: {round.score}</Text>
                    </View>
                ))}
                <TouchableOpacity onPress={handleRestart}>
                    <Text>Restart</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FinishScreen;
