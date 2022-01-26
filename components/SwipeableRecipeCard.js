import React,{useState,useRef} from 'react'
import { Animated, StyleSheet, Dimensions, View} from 'react-native';
import RecipeImage from '../components/RecipeImage'
import Recipe from '../components/Recipe'
import {PanGestureHandler} from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height
const cardHeight = windowHeight - 105
export default function SwipeableRecipeCard({recipe,swipedRecipe,swipe,addRecipe,nextRecipe}){
  const [clicked,click] = useState(false)

  const translationX = new Animated.Value(0)
  const translateY = new Animated.Value(0)
  const y = new Animated.Value(0)
  const ydiff = y.interpolate({inputRange:[0,cardHeight/3,2*cardHeight/3,cardHeight],outputRange:[1,.75,-.75,-1],extrapolate:'clamp'})

  const swipeX = useRef(new Animated.Value(0)).current
  const swipeY = useRef(new Animated.Value(0)).current
  const swipedY = useRef(new Animated.Value(0)).current
  const swipedYDiff = swipedY.interpolate({inputRange:[0,cardHeight/3,2*cardHeight/3,cardHeight],outputRange:[1,.75,-.75,-1],extrapolate:'clamp'})

  const translateX = translationX.interpolate({
    inputRange:[-500,500],
    outputRange:[-375,375]
  })

  const rotate = Animated.multiply(translateX,ydiff).interpolate({
    inputRange:[-500,500],
    outputRange:[`-35deg`,`35deg`],
    extrapolate:'clamp'
  })
  const swipeRotate = Animated.multiply(swipeX,swipedYDiff).interpolate({
    inputRange:[-500,500],
    outputRange:[`-35deg`,`35deg`],
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
    Animated.timing(translationX,{
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
    [{nativeEvent:{translationX,translationY:translateY,y}}],{useNativeDriver:true}
  )
  
  const handlePanStateChange = ({nativeEvent}) =>{
    const {state, translationX, translationY, y} = nativeEvent

    if(state===5){
      if( translationX > 150 || translationX < -150){
        swipeY.setValue(translationY)
        swipeX.setValue(translationX)
        swipedY.setValue(y)
        translationX > 150 ? swipeRight() : swipeLeft()
      }
      else resetView.start()
    }
  }

  const swipeRight = () => {
    const oldRecipe = recipe
    swipe()
    swipeRightAnimation.start()
    addRecipe(prevRecipes => prevRecipes.find(r => r.id === oldRecipe.id) ? prevRecipes : [...prevRecipes, oldRecipe])
  }

  const swipeLeft = () =>{
    swipe()
    swipeLeftAnimation.start()
  }

  return(
    <>
      <View style={styles.recipeCard}>
        <RecipeImage recipe={nextRecipe}/>
      </View>
      <PanGestureHandler enabled={!clicked} onHandlerStateChange={handlePanStateChange} onGestureEvent={handleSwipe} >
        <Animated.View style={[styles.recipeCard, {transform:[{translateX},{translateY},{rotate}]}]}>
            <Animated.Text style={[styles.label,styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
            <Animated.Text style={[styles.label,styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
            {clicked ? <Recipe recipe={recipe} click={click} /> : <RecipeImage click={click} recipe={recipe}/>}
        </Animated.View>
      </PanGestureHandler>
      {swipedRecipe ?
        <Animated.View style={[styles.recipeCard,{transform:[{translateX:swipeX},{translateY:swipeY},{rotate:swipeRotate}]}]}>
          <Animated.Text style={[styles.label,styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
          <Animated.Text style={[styles.label,styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
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

