import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    canvas: {
        flex: 1,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconButton: {
        padding: 8,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    guessesPanel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 18,
        margin: 10,
    },
    guess: {
        fontSize: 16,
        marginHorizontal: 4,
    },
});