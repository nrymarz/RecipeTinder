import React, {useState, useEffect,useRef} from 'react';
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

  const translateX = new Animated.Value(0)
  const opacity = new Animated.Value(1)

  useEffect(()=>{
    findRecipe(setNext)
    findRecipe(setRecipe)
    for(let i=0;i<5;i++){
      findRecipe((obj)=>recipes.enqueue(obj))
    }
  },[])

  useEffect(() =>{
    opacity.setValue(0)
    Animated.timing(opacity,{
      toValue:1,
      duration:1000,
      useNativeDriver:true
    }).start()
  },[recipe])

  const resetView = Animated.timing(translateX,{
    toValue:0,
    duration:330,
    easing: Easing.linear,
    useNativeDriver:true
  })

  const swipeRightAnimation = Animated.timing(translateX,{
    toValue: -500,
    duration: 250,
    easing: Easing.linear,
    useNativeDriver:true
  })

  const swipeLeftAnimation = Animated.timing(translateX,{
    toValue: 500,
    duration: 250,
    easing: Easing.linear,
    useNativeDriver:true
  })
  
  const swipeRight = () =>{
    const oldRecipe = recipe
    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.chef === oldRecipe.chef && r.title === oldRecipe.title)) return [...prevRecipes, oldRecipe]
      else return prevRecipes
    })
    setRecipe(nextRecipe)
  }

  const swipeLeft = () =>{
    setRecipe(nextRecipe)
    setNext(recipes.dequeue())
    findRecipe((obj)=>recipes.enqueue(obj))
  }

  const handleSwipe = Animated.event(
    [{nativeEvent:{translationX:translateX}}],{useNativeDriver:true}
  )

  const handlePanStateChange = ({nativeEvent}) =>{
    const {state} = nativeEvent
    if(state===5){
      if(nativeEvent.translationX < -225) swipeRightAnimation.start(() => swipeRight())
      else if(nativeEvent.translationX > 225) swipeLeftAnimation.start(()=>swipeLeft())
      else resetView.start()
    }
  }

  console.log(recipes.length)

  return (
    <View style={styles.container} >
      <PanGestureHandler
        enabled={!clicked}
        onHandlerStateChange={handlePanStateChange}
        onGestureEvent={handleSwipe}
      >
        <Animated.View style={[styles.recipeContainer,{opacity,transform:[{translateX}]}]}>
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
    backgroundColor: 'rgb(235,235,235)',
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