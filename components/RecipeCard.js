import React from 'react'
import { StyleSheet, Animated } from 'react-native';
import RecipeImage from '../components/RecipeImage'


export default function RecipeCard({recipe,rotate,translateY,translateX}){
    const likeOpacity = translateX.interpolate({
        inputRange:[0,50,150],
        outputRange:[0,0,1]
    })
    const nopeOpacity = translateX.interpolate({
        inputRange:[-150,-50,0],
        outputRange:[1,0,0]
    })

    return(
        <Animated.View style={[styles.recipeCard,{transform:[{translateX},{translateY},{rotate}]}]}>
            <Animated.Text style={[styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
            <Animated.Text style={[styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
            <RecipeImage recipe={recipe}/>
        </Animated.View>
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