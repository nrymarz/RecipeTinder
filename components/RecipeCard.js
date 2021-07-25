import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableHighlight, Animated } from 'react-native';


export default function RecipeCard({recipe,rotate,translateY,translateX}){
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