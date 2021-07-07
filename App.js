import { StatusBar } from 'expo-status-bar'
import React,{useState, useEffect, AsyncStorage} from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import RecipePage from './containers/RecipePage'
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
      recipes = await AsyncStorage.getItem("recipes")

      if(recipes!==null) setRecipes(JSON.parse(recipes))
    } catch(e){
      alert(e)
    }
  }

  const update = async () =>{
    try{
      await AsyncStorage.setItem("recipes", recipes)
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
