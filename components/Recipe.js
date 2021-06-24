import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DirectionsList from './DirectionsList'
import IngredientsList from './IngredientsList'

export default function Recipe({recipe}){

    return(
        <>
            <View>
                <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}></Text>
                <Text style={{textAlign:'center', paddingTop:5}}>{recipe.title}</Text>
            </View>
            <Text style={{paddingTop:10, fontWeight:"bold"}}>Ingredients</Text>
            <IngredientsList ingredients={recipe.ingredients}/>
            <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
            <DirectionsList directions={recipe.directions} />
        </>
    )
}