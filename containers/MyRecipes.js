import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RecipeListItem from '../components/RecipeListItem'


export default function MyRecipes({navigation, recipes, setRecipes}){
    function deleteRecipe(id){
        setRecipes(recipes.filter(r => r.id !== id))
    }

    const renderRecipe = ({item, index}) =>{
        return <RecipeListItem recipe={item} index={index}/>
    }

    return(
        <View>
            <FlatList 
                data={recipes}
                renderItem={renderRecipe}
            />
        </View>
    )
}