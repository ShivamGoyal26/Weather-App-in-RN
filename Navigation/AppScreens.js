import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Homescreen';
import Result from '../screens/Result';
import Weather from '../screens/Weather';

const Stack = createStackNavigator();

function AppScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Result" component={Result} options={{headerShown: false}}/>
        <Stack.Screen name="Weather" component={Weather} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppScreen;