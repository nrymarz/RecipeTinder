import { HeaderTitle } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function Recipe({route}){
    const {title, chef, ingredients, directions} = route.params.recipe
    return(
        <View>
            <Text>{title}</Text>
            <Text>{chef}</Text>
            <Text style={{paddingTop:15, fontWeight:"bold"}}>Ingredients</Text>
            <FlatList 
                data={recipe.ingredients} 
                style={{backgroundColor:'lightgreen'}} 
                renderItem={renderIngredients}
                keyExtractor={item => item}
            />
            <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
            <FlatList 
                style={{backgroundColor:"pink"}} 
                ItemSeparatorComponent={directionSeperator} 
                data={recipe.directions} 
                renderItem={renderDirections}
                keyExtractor={item => item}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})