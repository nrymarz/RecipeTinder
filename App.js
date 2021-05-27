import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react';
import HomePage from "./Home"
import { StyleSheet, Text, View, Button } from 'react-native'
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
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer:{
    backgroundColor: "white",
    height:"70%",
    width: "80%"
  },
  buttonContainer:{
    width:"80%",
    flexDirection:'row',
    justifyContent:"space-between"
  }
});
