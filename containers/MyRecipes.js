import React,{useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, FlatList} from 'react-native';
import RecipeListItem from '../components/RecipeListItem'

export default function MyRecipes({navigation, recipes, setRecipes}){

    function deleteRecipe(id){
        setRecipes(recipes.filter(r => r.id !== id))
    }

    const renderRecipe = ({item}) =>{
        return <RecipeListItem navigation={navigation} recipe={item} deleteRecipe={deleteRecipe}/>
    }

    return(
        <SafeAreaView style={{marginHorizontal:5}}>
            <FlatList 
                data={recipes}
                renderItem={renderRecipe}
            />
        </SafeAreaView>
    )
}