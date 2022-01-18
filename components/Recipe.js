import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import back from "../assets/back-arrow.png"
import DirectionsList from './DirectionsList'
import IngredientsList from './IngredientsList'

export default function Recipe({recipe, click}){

    function renderBackButton(){
        if(click !== undefined){
            return(
                <TouchableWithoutFeedback onPress={() => click(false)}>
                    <Image source={back} style={{marginLeft:8,height:35,width:35}}/>
                </TouchableWithoutFeedback>
            )
        }
    }

    return(
        <View style={styles.recipeCardBack}>
            {renderBackButton()}
            <Text style={{textAlign:'center', fontWeight:"700", fontSize:15}}>{recipe.title}</Text>
            <Text style={{textAlign:'center', paddingTop:5}}>{recipe.chef}</Text>
            <Text style={{paddingLeft:5, fontWeight:"bold"}}>Ingredients</Text>
            <IngredientsList ingredients={recipe.ingredients}/>
            <Text style={{paddingTop:5,paddingLeft:5, fontWeight:"bold"}}>Directions</Text>
            <DirectionsList directions={recipe.directions} />
        </View>
    )
}

const styles = StyleSheet.create({
    recipeCardBack:{
        backgroundColor:"floralwhite",
        flex:1
    }
})