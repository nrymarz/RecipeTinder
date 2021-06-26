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

  const resetView = Animated.timing(translateX,{
    toValue:0,
    duration:250,
    easing: Easing.linear,
    useNativeDriver:true
  })

  const swipeRightAnimation = Animated.timing(translateX,{
    toValue: 500,
    duration: 250,
    easing: Easing.linear,
    useNativeDriver:true
  })

  const swipeLeftAnimation = Animated.timing(translateX,{
    toValue: -500,
    duration: 250,
    easing: Easing.linear,
    useNativeDriver:true
  })
  
  const swipeRight = () =>{
    const oldRecipe = recipe
    newSwipe = false
    click(false)
    setRecipe(nextRecipe)
    findRecipe(setNext,setLoading)

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
    translateX.setValue(nativeEvent.translationX)
    if(nativeEvent.translationX > 225 && newSwipe) swipeRight()

    else if(nativeEvent.translationX < -225 && newSwipe) swipeLeft()
  }

  const handlePanStateChange = ({nativeEvent}) =>{
    const {state} = nativeEvent
    if(state === 5 && (nativeEvent.translationX > 225 || nativeEvent.translationX < -225)){
      const swipeAnimation = nativeEvent.translationX < 0 ?  swipeLeftAnimation : swipeRightAnimation
      swipeAnimation.start( ()=>{
        const v = (nativeEvent.translationX)*-2
        translateX.setValue(v)
        resetView.start()
      })
    }
    else if(state===5){
      resetView.start()
    }
  }

  return (
    <View style={styles.container} >
      <PanGestureHandler
        onHandlerStateChange={handlePanStateChange}
        onGestureEvent={handleSwipe}
      >
        <Animated.View style={[styles.recipeContainer,{transform:[{translateX}]}]}>
            {clicked ? <Recipe recipe={recipe} /> : <RecipeImage click={click} recipe={recipe}/>}
        </Animated.View>
      </PanGestureHandler>
      <View style={{height:"8%",marginTop:5}}>
        <Button title ="Go to My Recipes" onPress={()=>navigation.navigate('My Recipes')}></Button>
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
    width:"96%",
    borderRadius: 5,
    paddingTop:5,
    marginTop:2
  }
});