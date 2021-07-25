import React,{useState} from 'react'
import { StyleSheet, Animated, Dimensions } from 'react-native';

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
        <Animated.View style={[styles.recipeCard,{transform:[{translateX},{translateY},{rotate}]}]}>
          <Animated.Text style={[styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
          <Animated.Text style={[styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
          {clicked ? <Recipe recipe={recipe} click={click} /> : <RecipeImage click={click} recipe={recipe}/>}
        </Animated.View>
      </PanGestureHandler>
      {swipedRecipe ? <RecipeCard recipe={swipedRecipe} translateX={swipeX} translateY={swipeY} rotate={swipeRotate} /> : null}
    </>
  )
}