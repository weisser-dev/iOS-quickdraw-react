// root/screens/Home/HomeScreen.styles.ts
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffd139', // Background color of the entire screen
    },
    progressBar: {
        color: 'rgba(0, 0, 0, 0.4)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '100%',
    },
    header: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.4)',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    instruction: {
        fontSize: 24, // 1.5em equivalent
        fontWeight: 'normal',
        color: '#000',
        textAlign: 'center',
    },
    objectName: {
        fontSize: 32, // 2em equivalent
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    timer: {
        fontSize: 24, // 1.5em equivalent
        color: '#000',
        textAlign: 'center',
        marginBottom: 20
    },
    // ... other styles
});
