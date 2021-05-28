import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function MyRecipes({navigation, recipes}){

    const renderRecipe = (recipe) =>{
        return(
            <View>
                <Text>{recipe.title} by: {recipe.chef}</Text>
            </View>
        )
    }

    return(
        <View>
            <Button title="Find New Recipes" onPress={() => navigation.navigate("Find Recipes")}></Button>
            <Text>My Recipes</Text>
            <FlatList 
                data={recipes}
                renderItem={renderRecipe}
                keyExtractor={item => item.title}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})