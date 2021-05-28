import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function MyRecipes({navigation, recipes}){
    const renderRecipe = ({item}) =>{
        console.log(item)
        return(
            <View>
                <Text>{item.title} by {item.chef}</Text>
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
            />
        </View>
    )
}

const styles = StyleSheet.create({
})