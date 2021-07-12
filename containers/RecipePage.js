import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Image } from 'react-native';
import Recipe from '../components/Recipe'


export default function RecipePage({route}){

    return(
        <SafeAreaView style={styles.container}>
            <Image source={{uri: route.params.recipe.image}} style={{height:150, resizeMode:'contain'}}/>
            <Recipe recipe={route.params.recipe} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:5,
        height:"100%"
    }
})