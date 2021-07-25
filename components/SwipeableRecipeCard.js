import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableHighlight, Animated } from 'react-native';


export default function SwipeableRecipeCard({recipe,rotate,translateY,translateX}){
    return(
        <Animated.View style={[styles.recipeCard,{transform:[{translateX},{translateY},{rotate}]}]}>
            <Animated.Text style={[styles.likeLabel,{opacity:likeOpacity}]}>Like</Animated.Text>
            <Animated.Text style={[styles.nopeLabel,{opacity:nopeOpacity}]}>Nope</Animated.Text>
            <RecipeImage recipe={recipe}/>
        </Animated.View>
    )
}