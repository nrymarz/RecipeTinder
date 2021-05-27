import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React,{useState} from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
  const [recipes,addRecipe] = useState([])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Find Recipes">
          {props => <HomePage {...props} addRecipe = {addRecipe}/>}
        </Stack.Screen>

        <Stack.Screen name="My Recipes">
          {props => <MyRecipes {...props} recipes={recipes}/>}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
