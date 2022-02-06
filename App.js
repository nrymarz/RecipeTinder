import {GestureHandlerRootView} from 'react-native-gesture-handler'
import React from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import RecipePage from './containers/RecipePage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
'react-native link @react-native-community/async-storage'

const Tab = createBottomTabNavigator()

export default function App(){

  const addRecipe = async (recipe) =>{
    try{
      const json = await AsyncStorage.getItem("recipes")
      const recipes = json === null ? [recipe] : [recipe].concat(JSON.parse(json))
      await AsyncStorage.setItem("recipes", JSON.stringify(recipes))
    }catch(e){
      alert(e)
    }
  }

  function EmptyTab(){
    return <></>
  }
  
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{activeBackgroundColor:'rgb(230,230,230)',style:{height:50},labelStyle:{fontSize:13,marginBottom:'auto',marginTop:'auto'}}}>
          <Tab.Screen name="Find Recipes">
            {props => <HomePage {...props} addRecipe = {addRecipe}/>}
          </Tab.Screen>
          <Tab.Screen name="Saved Recipes">
            {props => <MyRecipes {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Recipe Page" component={RecipePage} options={{tabBarButton:EmptyTab}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
