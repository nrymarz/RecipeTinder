import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useState, useEffect} from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import RecipePage from './containers/RecipePage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

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

  function EmptyTab(){
    return <></>
  }
  
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{activeBackgroundColor:'rgb(230,230,230)',style:{height:50},labelStyle:{fontSize:13,marginBottom:'auto',marginTop:'auto'}}}>
        <Tab.Screen name="Find Recipes">
          {props => <HomePage {...props} addRecipe = {setRecipes}/>}
        </Tab.Screen>
        <Tab.Screen name="Saved Recipes">
          {props => <MyRecipes {...props} setRecipes={setRecipes} recipes={recipes}/>}
        </Tab.Screen>
        <Tab.Screen name="Recipe Page" component={RecipePage} options={{tabBarButton:EmptyTab}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
