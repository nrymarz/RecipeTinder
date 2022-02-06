import {GestureHandlerRootView} from 'react-native-gesture-handler'
import React from 'react';
import HomePage from "./containers/Home"
import MyRecipes from './containers/MyRecipes'
import RecipePage from './containers/RecipePage'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

export default function App(){

  function EmptyTab(){
    return <></>
  }
  
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{activeBackgroundColor:'rgb(230,230,230)',style:{height:50},labelStyle:{fontSize:13,marginBottom:'auto',marginTop:'auto'}}}>
          <Tab.Screen name="Find Recipes" component={HomePage} />
          <Tab.Screen name="Saved Recipes" component={MyRecipes}/>
          <Tab.Screen name="Recipe Page" component={RecipePage} options={{tabBarButton:EmptyTab}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
