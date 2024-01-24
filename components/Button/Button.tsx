// Button.tsx
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import buttonStyles from './Button.styles';

type ButtonProps = {
    title: string;
    onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({title, onPress}) => {
    return (
        <View style={buttonStyles.buttonContainer}>
            <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
                <Text style={buttonStyles.buttonText}>{title}</Text>
            </TouchableOpacity>
            {/* This view creates the darker shade on the bottom for the 3D effect */}
            <View style={buttonStyles.bottomShadow}/>
        </View>
    );
};

export default Button;
