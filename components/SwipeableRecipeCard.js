import React,{useState,useRef} from 'react'
import { StyleSheet, Animated, Dimensions, View} from 'react-native';
import RecipeCard from './RecipeCard';
import RecipeImage from '../components/RecipeImage'
import {PanGestureHandler} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('screen').height
export default function SwipeableRecipeCard({recipe,swipedRecipe,setSwipedRecipe,setRecipe,addRecipe}){
  const [clicked,click] = useState(false)

  const translateX = new Animated.Value(0)
  const translateY = new Animated.Value(0)
  const y = new Animated.Value(0)
  const ydiff = y.interpolate({inputRange:[0,screenHeight/2-1,screenHeight/2],outputRange:[1,1,-1],extrapolate:'clamp'})

  const swipeX = useRef(new Animated.Value(0)).current
  const swipeY = useRef(new Animated.Value(0)).current
  const swipedY = useRef(new Animated.Value(0)).current
  const swipedYDiff = swipedY.interpolate({inputRange:[0,screenHeight/2-1,screenHeight/2],outputRange:[1,1,-1],extrapolate:'clamp'})

  const rotate = Animated.multiply(translateX,ydiff).interpolate({
    inputRange:[-500,500],
    outputRange:[`-30deg`,`30deg`],
    extrapolate:'clamp'
  })
  const swipeRotate = Animated.multiply(swipeX,swipedYDiff).interpolate({
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
  

  const swipeLeftAnimation = Animated.timing(swipeX,{
    toValue: -650,
    duration: 150,
    useNativeDriver:true
  })

  const swipeRightAnimation = Animated.timing(swipeX,{
    toValue: 650,
    duration: 150,
    useNativeDriver:true
  })

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

  const handleSwipe = Animated.event(
    [{nativeEvent:{translationX:translateX,translationY:translateY,y}}],{useNativeDriver:true}
  )
  
  const handlePanStateChange = ({nativeEvent}) =>{
    const {state, translationX, translationY, y} = nativeEvent
    if(state===5){
      swipeY.setValue(translationY)
      swipeX.setValue(translationX)
      swipedY.setValue(y)
      if(translationX < -150) swipeLeft()
      else if(translationX > 150) swipeRight()
      else resetView.start()
    }
  }

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

  return(
    <>
      <PanGestureHandler enabled={!clicked} onHandlerStateChange={handlePanStateChange} onGestureEvent={handleSwipe} >
        <Animated.View style={[styles.recipeCard, {transform:[{translateX},{translateY},{rotate}]}]}>
            <Animated.Text style={[styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
            <Animated.Text style={[styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
            {clicked ? <Recipe recipe={recipe} click={click} /> : <RecipeImage click={click} recipe={recipe}/>}
        </Animated.View>
      </PanGestureHandler>
      {swipedRecipe ?
        <Animated.View style={[styles.recipeCard,{transform:[{translateX:swipeX},{translateY:swipeY},{rotate:swipeRotate}]}]}>
          <Animated.Text style={[styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
          <Animated.Text style={[styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
          <RecipeImage recipe={swipedRecipe}/>
        </Animated.View>
      : null}
    </>
  )
}

const styles = StyleSheet.create({
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

