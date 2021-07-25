import React, {useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import findRecipe from '../scraper'
import {PanGestureHandler} from 'react-native-gesture-handler';
import RecipeImage from '../components/RecipeImage'
import Queue from '../Queue'
import Recipe from '../components/Recipe'


const screenHeight = Dimensions.get('screen').height
const recipes = new Queue()

export default function HomePage({addRecipe}) {

  const [clicked,click] = useState(false)
  const [recipe, setRecipe] = useState({})
  const [nextRecipe, setNext] = useState({})
  const [swipedRecipe,setSwipedRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  const translateX = new Animated.Value(0)
  const translateY = new Animated.Value(0)
  const y = new Animated.Value(0)
  const ydiff = y.interpolate({inputRange:[0,screenHeight/2-1,screenHeight/2],outputRange:[1,1,-1],extrapolate:'clamp'})
  const swipeX = useRef(new Animated.Value(0))
  const swipeY = useRef(new Animated.Value(0))
  const swipeRotate = useRef(new Animated.Value(0))
  const oldY = useRef(new Animated.Value(0))
  const swipedYDiff = oldY.current.interpolate({inputRange:[0,screenHeight/2-1,screenHeight/2],outputRange:[1,1,-1],extrapolate:'clamp'})
  const rotate = Animated.multiply(translateX,ydiff).interpolate({
    inputRange:[-500,500],
    outputRange:[`-30deg`,`30deg`],
    extrapolate:'clamp'
  })
  swipeRotate.current = Animated.multiply(swipeX.current,swipedYDiff).interpolate({
    inputRange:[-500,500],
    outputRange:[`-30deg`,`30deg`],
    extrapolate:'clamp'
  })
  const likeOpacity = translateX.interpolate({
    inputRange:[0,50,150],
    outputRange:[0,0,1]
  })
  const nopeOpacity = translateX.interpolate({
    inputRange:[-150,-50,0],
    outputRange:[1,0,0]
  })
  useEffect(()=>{
    findRecipe(setNext)
    findRecipe(setRecipe, setLoading)
    for(let i=0;i<10;i++) findRecipe((obj)=>recipes.enqueue(obj)) 
  },[])

  useEffect(() =>{
    setNext(recipes.dequeue())
    findRecipe((obj)=>recipes.enqueue(obj))
  },[recipe])

  const resetView = Animated.parallel([
      Animated.timing(translateX,{
      toValue:0,
      duration:200,
      useNativeDriver:true
    }),
    Animated.timing(translateY,{
      toValue:0,
      duration:200,
      useNativeDriver:true
    })
  ])

  const swipeLeftAnimation = Animated.timing(swipeX.current,{
    toValue: -650,
    duration: 150,
    useNativeDriver:true
  })

  const swipeRightAnimation = Animated.timing(swipeX.current,{
    toValue: 650,
    duration: 150,
    useNativeDriver:true
  })
  
  const swipeRight = () =>{
    const oldRecipe = recipe
    setSwipedRecipe(recipe)
    setRecipe(nextRecipe)
    swipeRightAnimation.start(()=>setSwipedRecipe(null))
    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.id === oldRecipe.id)) return [...prevRecipes, oldRecipe]
      else return prevRecipes
    })
  }

  const swipeLeft = () =>{
    setSwipedRecipe(recipe)
    setRecipe(nextRecipe)
    swipeLeftAnimation.start(()=>setSwipedRecipe(null))
  }

  const handleSwipe = Animated.event(
    [{nativeEvent:{translationX:translateX,translationY:translateY,y}}],{useNativeDriver:true}
  )

  const handlePanStateChange = ({nativeEvent}) =>{
    const {state, translationX, translationY, y} = nativeEvent
    if(state===5){
      swipeY.current.setValue(translationY)
      swipeX.current.setValue(translationX)
      oldY.current.setValue(y)
      if(translationX < -150) swipeLeft()
      else if(translationX > 150) swipeRight()
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
        <View style={[styles.recipeCard]}>
            <RecipeImage recipe={nextRecipe} />
        </View>
        <PanGestureHandler
          enabled={!clicked}
          onHandlerStateChange={handlePanStateChange}
          onGestureEvent={handleSwipe}
        >
          <Animated.View style={[styles.recipeCard,{transform:[{translateX},{translateY},{rotate}]}]}>
            <Animated.Text style={[styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
            <Animated.Text style={[styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
            {clicked ? <Recipe recipe={recipe} click={click} /> : <RecipeImage click={click} recipe={recipe}/>}
          </Animated.View>
        </PanGestureHandler>
        {swipedRecipe ?
          <Animated.View style={[styles.recipeCard,{transform:[{translateX:swipeX.current},{translateY:swipeY.current},{rotate:swipeRotate.current}]}]}>
            <Animated.Text style={[styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
            <Animated.Text style={[styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
            <RecipeImage recipe={swipedRecipe}/>
          </Animated.View>
        : null}
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
  },
  likeLabel:{
    borderColor:'rgb(0,255,200)',
    position:'absolute',
    zIndex:1,
    borderWidth:3,
    fontSize:50,
    padding:5,
    borderRadius:5,
    color:'rgb(0,255,200)',
    bottom:120,
    left:20,
    fontWeight:'bold',
    transform:[{rotate:'-30deg'}]
  },
  nopeLabel:{
    borderColor:'rgb(255,50,50)',
    position:'absolute',
    zIndex:1,
    borderWidth:3,
    fontSize:50,
    padding:5,
    borderRadius:5,
    color:'rgb(255,50,50)',
    bottom:120,
    right:20,
    fontWeight:'bold',
    transform:[{rotate:'30deg'}]
  }
});