import React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/Home/HomeScreen'; // Adjust the path as necessary
// Importing your translation setup if necessary
import './i18n';
import {StatusBar} from "react-native";
import DrawScreen from "./screens/Draw/DrawScreen.tsx";

enableScreens(); // Enable screens before any other import that uses them

const Stack = createStackNavigator();

function App(): React.ReactElement {
    return (
        <>

            <StatusBar hidden={true}/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerShown: false, // This hides the navigation header for all screens
                }}>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="DrawScreen" component={DrawScreen}/>
                    {/* You can add more screens to the navigator here */}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default App;