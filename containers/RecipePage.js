import React from 'react';
import { StyleSheet, View } from 'react-native';
import Recipe from '../components/Recipe'


export default function RecipePage({route}){

    return(
        <View style={styles.container}>
            <Recipe recipe={route.params.recipe} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:10,
        height:"100%"
    }
})