import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import back from "/home/nrymarz/RecipeTinder/assets/back-arrow.png"
import DirectionsList from './DirectionsList'
import IngredientsList from './IngredientsList'

export default function Recipe({recipe, click}){

    return(
        <>
            <TouchableWithoutFeedback onPress={() => click(false)}>
                <Image source={back} style={{marginLeft:8,height:25,width:25}}/>
            </TouchableWithoutFeedback>
            <Text style={{textAlign:'center', fontWeight:"700", fontSize:15}}>{recipe.title}</Text>
            <Text style={{textAlign:'center', paddingTop:5}}>{recipe.chef}</Text>
            <Text style={{paddingLeft:5, fontWeight:"bold"}}>Ingredients</Text>
            <IngredientsList ingredients={recipe.ingredients}/>
            <Text style={{paddingTop:5,paddingLeft:5, fontWeight:"bold"}}>Directions</Text>
            <DirectionsList directions={recipe.directions} />
        </>
    )
}