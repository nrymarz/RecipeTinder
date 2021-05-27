import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Find Recipes"
          component={HomePage}
        />

        <Stack.Screen
          name="My Recipes"
          component={MyRecipes}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
