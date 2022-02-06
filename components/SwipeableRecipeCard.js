import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View} from 'react-native';
import Animated, 
  {
    useSharedValue,
    useAnimatedStyle, 
    useAnimatedGestureHandler, 
    useDerivedValue, 
    withTiming
  } from 'react-native-reanimated'
import RecipeImage from '../components/RecipeImage'
import Recipe from '../components/Recipe'
import {PanGestureHandler} from 'react-native-gesture-handler';

export default function SwipeableRecipeCard({recipe,swipedRecipe,swipe,nextRecipe}){
  const [clicked,click] = useState(false)
 
  const translationX = useSharedValue(0)
  const translationY = useSharedValue(0)
  const y = useSharedValue(0)
  const rotate = useDerivedValue(()=>{
    return `${((y.value-275)*translationX.value*-1)/2000}deg`
  })

  const swipedOnTranslationX = useSharedValue(0)
  const swipedOnTranslationY = useSharedValue(0)
  const swipedOnY = useSharedValue(0)
  const swipedRecipeRotate = useDerivedValue(()=>{
    return `${((swipedOnY.value-275)*swipedOnTranslationX.value*-1)/2000}deg`
  })

  const labelOpacity = useDerivedValue(()=>(translationX.value)/135)
  const swipedLabelOpacity = useDerivedValue(()=>swipedOnTranslationX.value/135)

  useEffect(()=>{
    swipedOnTranslationX.value = translationX.value
    swipedOnTranslationY.value = translationY.value
    const swipedCardDestination = translationX.value > 0 ? 650 : -650
    swipedOnY.value = y.value
    translationX.value = 0
    translationY.value = 0
    swipedOnTranslationX.value = withTiming(swipedCardDestination)
  },[swipedRecipe])

  
  const addRecipeToStorage = async () =>{
    try{
      const json = await AsyncStorage.getItem("recipes")
      const recipes = json === null ? [recipe] : [recipe].concat(JSON.parse(json))
      await AsyncStorage.setItem("recipes", JSON.stringify(recipes))
    }catch(e){
      alert(e)
    }
  }

  const handlePan = useAnimatedGestureHandler({
    onActive:(e)=>{
      translationX.value = e.translationX*0.8
      translationY.value = e.translationY
      y.value = e.y   
    }
  })

  const handleSwipe = ({nativeEvent}) =>{
    const {state} = nativeEvent
    if(state===5){
      if(nativeEvent.translationX > 150) swipeRight()
      else if(nativeEvent.translationX < -150) swipe()
      else{
        translationX.value = withTiming(0)
        translationY.value = withTiming(0)
      }
    }
  }

  const animatedRecipeStyle= useAnimatedStyle(()=>{
    return{
      transform:[{translateX:translationX.value},{translateY:translationY.value},{rotate:rotate.value}]
    }
  })

  const swipeAnimation = useAnimatedStyle(()=>{
    return{
      transform:[{translateX:swipedOnTranslationX.value},{translateY:swipedOnTranslationY.value},{rotate:swipedRecipeRotate.value}]
    }
  })

  const likeOpacityStyle = useAnimatedStyle(()=>({opacity:labelOpacity.value}))
  const nopeOpacityStyle = useAnimatedStyle(()=>({opacity:-1*labelOpacity.value}))
  const swipedLikeOpacityStyle = useAnimatedStyle(()=>({opacity:swipedLabelOpacity.value}))
  const swipedNopeOpacityStyle = useAnimatedStyle(()=>({opacity:-1*swipedLabelOpacity.value}))

  const swipeRight = () => {
    addRecipeToStorage()
    swipe()
  }

  return(
    <>
      <View style={styles.recipeCard}>
        <RecipeImage recipe={nextRecipe}/>
      </View>
      <PanGestureHandler enabled={!clicked} onGestureEvent={handlePan} onHandlerStateChange={handleSwipe}>
        <Animated.View style={[styles.recipeCard, animatedRecipeStyle]}>
          <Animated.Text style={[styles.label,styles.likeLabel,likeOpacityStyle]}>Like</Animated.Text>
          <Animated.Text style={[styles.label,styles.nopeLabel,nopeOpacityStyle]}>Nope</Animated.Text>
          {clicked ? <Recipe recipe={recipe} click={click} /> : <RecipeImage click={click} recipe={recipe}/>}
        </Animated.View>
      </PanGestureHandler>
      {swipedRecipe ?
        <Animated.View style={[styles.recipeCard, swipeAnimation]}>
          <Animated.Text style={[styles.label,styles.likeLabel,swipedLikeOpacityStyle]}>Like</Animated.Text>
          <Animated.Text style={[styles.label,styles.nopeLabel,swipedNopeOpacityStyle]}>Nope</Animated.Text>
          <RecipeImage recipe={swipedRecipe}/>
        </Animated.View>
      : null}
    </>
  )
}

const styles = StyleSheet.create({
  recipeCard:{
    width:"100%",
    height:"100%",
    borderRadius: 5,
    position:'absolute',
    borderWidth:1.5,
    borderColor:'black'
  },
  label:{
    position:'absolute',
    zIndex:1,
    borderWidth:3,
    fontSize:50,
    paddingHorizontal:12,
    paddingVertical:6,
    borderRadius:5,
    fontWeight:'bold'
  },
  likeLabel:{
    borderColor:'rgb(0,255,0)',
    backgroundColor:'rgb(0,50,0)',
    color:'rgb(0,255,0)',
    bottom:120,
    left:20,
    transform:[{rotate:'-30deg'}]
  },
  nopeLabel:{
    borderColor:'rgb(255,50,50)',
    backgroundColor:'rgb(50,0,0)',
    position:'absolute',
    color:'rgb(255,50,50)',
    bottom:120,
    right:20,
    transform:[{rotate:'30deg'}]
  }
});

