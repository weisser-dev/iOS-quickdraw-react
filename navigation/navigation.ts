import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RoundData} from "../model/types";

export type HomeStackParamList = {
    Home: undefined | { newProgress: number }; // To receive updated progress
    DrawScreen: { objectName: string, currentProgress: number }; // Include currentProgress
    FinishScreen: { totalScore: number, rounds: RoundData[] };
    // ... other screens
};

export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;
export type DrawScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'DrawScreen'>;
export type FinishScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'FinishScreen'>; // For navigating to FinishScreen
export type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;
export type DrawScreenRouteProp = RouteProp<HomeStackParamList, 'DrawScreen'>;
export type FinishScreenRouteProp = RouteProp<HomeStackParamList, 'FinishScreen'>; // For receiving parameters in FinishScreen

// ... any other navigation props or route props for other screens
