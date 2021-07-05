import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function MyRecipes({navigation, recipes}){
    const renderRecipe = ({item}) =>{
        return(
            <View style={{paddingTop:5}}>
                <Text onPress={ () => navigation.navigate('Recipe Page',{recipe: item})}>{item.title} by {item.chef}</Text>
            </View>
        )
    }

    return(
        <View>
            <FlatList 
                data={recipes}
                renderItem={renderRecipe}
                keyExtractor={(item) => item.title + item.chef}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})