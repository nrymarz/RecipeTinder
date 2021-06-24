import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Animated, Easing } from 'react-native';
import findRecipe from '../scraper'
import {PanGestureHandler} from 'react-native-gesture-handler';
import RecipeImage from '../components/RecipeImage'
import Recipe from '../components/Recipe'

export default function HomePage({navigation, addRecipe}) {


  const [clicked,click] = useState(false)
  const [nextRecipe, setNext] = useState({})
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(true)

  let newSwipe = false
  let translateX = new Animated.Value(0)

  useEffect(()=>{
    findRecipe(setRecipe, setLoading)
    findRecipe(setNext)
  },[])
  
  const swipeRight = () =>{
    const oldRecipe = recipe
    swipeLeft()

    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.chef === oldRecipe.chef && r.title === oldRecipe.title)) return [...prevRecipes, oldRecipe]
      else return prevRecipes
    })
  }

  const swipeLeft = () =>{
    newSwipe = false
    click(false)
    setRecipe(nextRecipe)
    findRecipe(setNext, setLoading)
  }

  const handleSwipe = ({nativeEvent}) =>{
    if(nativeEvent.translationX === 0) newSwipe = true
    if(newSwipe) translateX.setValue(nativeEvent.translationX)
    if(nativeEvent.translationX > 175 && newSwipe) swipeLeft()
    else if(nativeEvent.translationX < -150 && newSwipe) swipeRight()
  }

  const resetView = ({nativeEvent}) =>{
    const {state} = nativeEvent
    console.log(state)
    if(state === 5)translateX.setValue(0)
  }

  return (
    <View style={styles.container} >
      <View style={{height:"5%"}}>
        <Button title ="Go to My Recipes" onPress={()=>navigation.navigate('My Recipes')}></Button>
      </View>
      <PanGestureHandler
        onHandlerStateChange={resetView}
        onGestureEvent={handleSwipe}
      >
        <Animated.View style={[styles.recipeContainer,{transform:[{translateX}]}]}>
            {clicked ? <Recipe recipe={recipe} /> : <RecipeImage click={click} recipe={recipe}/>}
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.buttonContainer}>
        <Button title="Left" color="brown" style={styles.button} onPress={swipeLeft}></Button>
        <Button title="Right" color="brown" style={styles.button} onPress ={swipeRight}></Button>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer:{
    flex:1,
    backgroundColor: 'rgba(250,250,250,.85)',
    width:"100%"
  },
  buttonContainer:{
    height:"5%",
    width:"100%",
    flexDirection:'row',
    justifyContent:"space-between"
  }
});