import React,{useState} from 'react';
import { StyleSheet, View, FlatList, Animated} from 'react-native';
import RecipeListItem from '../components/RecipeListItem'

export default function MyRecipes({navigation, recipes, setRecipes}){

    function deleteRecipe(id){
        setRecipes(recipes.filter(r => r.id !== id))
    }

    const renderRecipe = ({item, index}) =>{
        return <RecipeListItem navigation={navigation} recipe={item} index={index} deleteRecipe={deleteRecipe}/>
    }

    return(
        <View style={{marginHorizontal:5}}>
            <FlatList 
                data={recipes}
                renderItem={renderRecipe}
            />
        </View>
    )
}