import React, {useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Button, Animated, Easing } from 'react-native';
import findRecipe from '../scraper'
import {PanGestureHandler} from 'react-native-gesture-handler';
import RecipeImage from '../components/RecipeImage'
import Queue from '../Queue'
import Recipe from '../components/Recipe'

const recipes = new Queue()

export default function HomePage({navigation, addRecipe}) {

  const [clicked,click] = useState(false)
  const [recipe, setRecipe] = useState({})
  const [nextRecipe, setNext] = useState({})
  const [loading, setLoading] = useState(true)
  const [first, setFirst] = useState(true)

  const translateX = new Animated.Value(0)
  const translateY = new Animated.Value(0)
  const rotate = translateX.interpolate({
    inputRange:[-500,500],
    outputRange:[`-40deg`,`40deg`],
    extrapolate:'clamp'
  })

  
  useEffect(()=>{
    findRecipe(setNext)
    findRecipe(setRecipe, setLoading)
    for(let i=0;i<5;i++){
      findRecipe((obj)=>recipes.enqueue(obj))
    }
  },[])

  useEffect(() =>{
    setNext(recipes.dequeue())
    findRecipe((obj)=>recipes.enqueue(obj))
  },[recipe])

  const resetView = Animated.parallel([
      Animated.timing(translateX,{
      toValue:0,
      duration:200,
      easing: Easing.linear,
      useNativeDriver:true
    }),
    Animated.timing(translateY,{
      toValue:0,
      duration:200,
      easing: Easing.linear,
      useNativeDriver:true
    })
  ])

  const swipeLeftAnimation = Animated.timing(translateX,{
    toValue: -650,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver:true
  })

  const swipeRightAnimation = Animated.timing(translateX,{
    toValue: 650,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver:true
  })
  
  const swipeRight = () =>{
    const oldRecipe = recipe
    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.id === oldRecipe.id)) return [...prevRecipes, oldRecipe]
      else return prevRecipes
    })
    swipeLeft()
  }

  const swipeLeft = () =>{
    setFirst(false)
    setRecipe(nextRecipe)
  }

  const handleSwipe = Animated.event(
    [{nativeEvent:{translationX:translateX,translationY:translateY}}],{useNativeDriver:true}
  )

  const handlePanStateChange = ({nativeEvent}) =>{
    const {state} = nativeEvent
    if(state===5){
      if(nativeEvent.translationX < -225) swipeLeftAnimation.start(() => swipeRight())
      else if(nativeEvent.translationX > 225) swipeRightAnimation.start(()=>swipeLeft())
      else resetView.start()
    }
  }

  if(loading){
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={{fontSize:25}}>Loading...</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.recipeCard]}>
            {nextRecipe ? <RecipeImage recipe={nextRecipe} /> : null}
        </Animated.View>
        <PanGestureHandler
          enabled={!clicked}
          onHandlerStateChange={handlePanStateChange}
          onGestureEvent={handleSwipe}
        >
          <Animated.View style={[styles.recipeCard,{transform:[{translateX},{translateY},{rotate}]}]}>
              {clicked ? <Recipe recipe={recipe} click={click} /> : <RecipeImage click={click} recipe={recipe} first={first}/>}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    margin:10
  },
  cardContainer:{
    flex:1,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  recipeCard:{
    backgroundColor: 'rgb(235,235,235)',
    width:"100%",
    height:"100%",
    borderRadius: 5,
    position:'absolute',
    borderWidth:1.5,
    borderColor:'black'
  }
});