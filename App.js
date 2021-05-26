import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react';
import RecipeContainer from "./RecipeContainer"
import { StyleSheet, Text, View, Button } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <RecipeContainer/>
        <StatusBar style="auto" />
      </View>
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
