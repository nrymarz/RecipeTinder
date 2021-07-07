import { StatusBar } from 'expo-status-bar'
import React,{useState, useEffect} from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import RecipePage from './containers/RecipePage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'



const Stack = createStackNavigator()

export default function App() {
  const [recipes,setRecipes] = useState([])

  useEffect(()=>{
    load()
  },[])

  useEffect(()=>{
    update()
  },[recipes])

  const load = async () =>{
    try{
      let recipes = await AsyncStorage.getItem("recipes")

      if(recipes!==null) setRecipes(JSON.parse(recipes))
    } catch(e){
      alert(e)
    }
  }

  const update = async () =>{
    try{
      const json = JSON.stringify(recipes)
      await AsyncStorage.setItem("recipes", json)
    } catch(e){
      alert(e)
    }
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Find Recipes">
          {props => <HomePage {...props} addRecipe = {setRecipes}/>}
        </Stack.Screen>

        <Stack.Screen name="My Recipes">
          {props => <MyRecipes {...props} recipes={recipes}/>}
        </Stack.Screen>

        <Stack.Screen name="Recipe Page" component={RecipePage} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
