import React,{useState,useEffect} from 'react'
import { StyleSheet, Dimensions, View} from 'react-native';
import Animated, {useSharedValue,useAnimatedStyle, useAnimatedGestureHandler, useDerivedValue, withTiming} from 'react-native-reanimated'
import RecipeImage from '../components/RecipeImage'
import Recipe from '../components/Recipe'
import {PanGestureHandler, GestureDetector, Gesture, runOnJS} from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height
const cardHeight = windowHeight - 105
export default function SwipeableRecipeCard({recipe,swipedRecipe,swipe,addRecipe,nextRecipe}){
  const [clicked,click] = useState(false)
 
  const translationX = useSharedValue(0)
  const translationY = useSharedValue(0)
  const y = useSharedValue(0)
  const rotate = useDerivedValue(()=>{
    return `${((y.value-275)*translationX.value*-1)/2000}deg`
  })


  // const swipeX = useRef(new Animated.Value(0)).current
  // const swipeY = useRef(new Animated.Value(0)).current
  // const swipedY = useRef(new Animated.Value(0)).current
  // const swipedYDiff = swipedY.interpolate({inputRange:[0,cardHeight/3,2*cardHeight/3,cardHeight],outputRange:[1,.75,-.75,-1],extrapolate:'clamp'})


  // const swipeRotate = Animated.multiply(swipeX,swipedYDiff).interpolate({
  //   inputRange:[-500,500],
  //   outputRange:[`-35deg`,`35deg`],
  //   extrapolate:'clamp'
  // })


  const labelOpacity = useDerivedValue(()=>(translationX.value)/135)

  const panGesture = Gesture.Pan()
    .onUpdate((e) =>{
      translationX.value = e.translationX*0.8
      translationY.value = e.translationY
      y.value = e.y
      
    })
    .onEnd(()=>{
      if(translationX.value > 150) console.log('right')
      else if(translationX.value < -150){
        
      }
      else{
        translationX.value = withTiming(0)
        translationY.value = withTiming(0)
      }
    })

    const handlePan = useAnimatedGestureHandler({
      onActive:(e)=>{
        translationX.value = e.translationX*0.8
        translationY.value = e.translationY
        y.value = e.y   
      },
      onEnd:()=>{
        translationX.value = withTiming(0)
        translationY.value = withTiming(0)
      }
    })

    const handleSwipe = ({nativeEvent}) =>{
      const {state, translationX, translationY, y} = nativeEvent
      if(state===5){
        if( translationX > 150 || translationX < -150){
          // swipeY.setValue(translationY)
          // swipeX.setValue(translationX)
          // swipedY.setValue(y)
          translationX > 150 ? swipeRight() : swipeLeft()
        }
      }
    }

  const animatedRecipeStyle= useAnimatedStyle(()=>{
    return{
      transform:[{translateX:translationX.value},{translateY:translationY.value},{rotate:rotate.value}]
    }
  })

  const likeOpacityStyle = useAnimatedStyle(()=>({opacity:labelOpacity.value}))
  const nopeOpacityStyle = useAnimatedStyle(()=>({opacity:-1*labelOpacity.value}))

  const swipeRight = () => {
    const oldRecipe = recipe
    swipe()
    addRecipe(prevRecipes => prevRecipes.find(r => r.id === oldRecipe.id) ? prevRecipes : [...prevRecipes, oldRecipe])
  }

  const swipeLeft = () =>{
    console.log('left')
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
      {false ?
        <Animated.View style={[styles.recipeCard]}>
          <Animated.Text style={[styles.label,styles.likeLabel]}>Like</Animated.Text>
          <Animated.Text style={[styles.label,styles.nopeLabel]}>Nope</Animated.Text>
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

