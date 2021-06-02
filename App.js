import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React,{useState} from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import Recipe from './containers/Recipe'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import axios from 'axios'
import {parse} from 'node-html-parser'

const Stack = createStackNavigator()

axios.get("https://www.foodnetwork.com/search/p/1/CUSTOM_FACET:RECIPE_FACET")
  .then( res => console.log(res.data))

export default function App() {
  const [recipes,setRecipes] = useState([])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Find Recipes">
          {props => <HomePage {...props} addRecipe = {setRecipes}/>}
        </Stack.Screen>

        <Stack.Screen name="My Recipes">
          {props => <MyRecipes {...props} recipes={recipes}/>}
        </Stack.Screen>

        <Stack.Screen name="Recipe Page" component={Recipe} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
