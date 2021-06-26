import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native';

export default function IngredientsList({ingredients}){
    const renderIngredients = ({item}) =>{
        return <Text style={{paddingLeft:5,paddingTop:1}}>{`- ${item}`}</Text>
    }

    return(
        <FlatList
            data={ingredients} 
            style={{backgroundColor:'lightgreen', maxHeight:"41%"}} 
            renderItem={renderIngredients}
            keyExtractor={(item,idx) => item + idx}
        />
    )
}