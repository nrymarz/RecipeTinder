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

  let translateX = new Animated.Value(0)

  useEffect(()=>{
    findRecipe(setRecipe, setLoading)
    findRecipe(setNext)
  },[])

  useEffect(()=>{
    resetView.start(({finished})=>console.log(finished))
  },[recipe])

  const resetView = Animated.timing(translateX,{
    toValue:0,
    duration:330,
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
    click(false)
    setRecipe(nextRecipe)
    findRecipe(setNext,setLoading)

    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.chef === oldRecipe.chef && r.title === oldRecipe.title)) return [...prevRecipes, oldRecipe]
      else return prevRecipes
    })
  }

  const swipeLeft = () =>{
    click(false)
    setRecipe(nextRecipe)
    findRecipe(setNext, setLoading)
    translateX.setValue(350)
  }

  const handleSwipe = Animated.event(
    [{nativeEvent:{translationX:translateX}}],{useNativeDriver:true}
  )

  const handlePanStateChange = ({nativeEvent}) =>{
    const {state} = nativeEvent
    if(state === 5 && nativeEvent.translationX < -225){
      swipeLeftAnimation.start( ()=>{
        swipeLeft()
      })

    }
    else if(state === 5 && nativeEvent.translationX > 225){
      swipeRightAnimation.start( ()=>{
        translateX.setValue(-350)
        //swipeRight()
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
        enabled={!clicked && !loading}
        onHandlerStateChange={handlePanStateChange}
        onGestureEvent={handleSwipe}
      >
        <Animated.View style={[styles.recipeContainer,{transform:[{translateX}]}]}>
            {clicked ? <Recipe recipe={recipe} click={click} /> : <RecipeImage click={click} recipe={recipe}/>}
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.bottomNav}>
        <Button title ="My Recipes" onPress={()=>navigation.navigate('My Recipes')} color={"silver"}></Button>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer:{
    flex:1,
    backgroundColor: 'rgb(240,240,240)',
    width:"96%",
    borderRadius: 5,
    borderWidth:1.5,
    borderColor:'black',
    marginTop:5
  },
  bottomNav:{
    width:"50%",
    height:50,
    marginTop:5
  }
  
});