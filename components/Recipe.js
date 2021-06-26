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
            <View>
                <Text style={{textAlign:'center', fontWeight:"700", fontSize:15}}></Text>
                <Text style={{textAlign:'center', paddingTop:5}}>{recipe.title}</Text>
            </View>
            <Text style={{paddingTop:10, fontWeight:"bold"}}>Ingredients</Text>
            <IngredientsList ingredients={recipe.ingredients}/>
            <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
            <DirectionsList directions={recipe.directions} />
        </>
    )
}