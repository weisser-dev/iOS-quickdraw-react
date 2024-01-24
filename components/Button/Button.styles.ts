// Button.styles.ts
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    buttonContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        backgroundColor: 'transparent', // No background color here, it's set on the button itself
    },
    button: {
        backgroundColor: '#4CAF50', // Main button color
        paddingHorizontal: 30,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // No border radius for a flat top
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        // Bottom border to simulate 3D effect
        borderBottomWidth: 4,
        borderBottomColor: '#388E3C',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // A separate view for the bottom shadow effect
    bottomShadow: {
        backgroundColor: '#2E7D32',
        height: 4, // Height of the bottom 'shadow'
    },
});
