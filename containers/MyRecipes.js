import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';


export default function MyRecipes({navigation, recipes}){
    const renderRecipe = ({item, index}) =>{
        return(
            <TouchableOpacity style={[styles.recipeWrapper, {backgroundColor: index%2===0 ? "rgb(210,210,210)" : "rgb(225,225,225)"}]} onPress={ () => navigation.navigate('Recipe Page',{recipe: item})} >
                <View style={{flex:1, flexDirection:'row'}}>
                    <Image source={{uri: item.image}} style={{width:70,height:70, marginRight:10}}/>
                    <View style={{alignContent:'center',justifyContent:"center", width:"80%"}}>
                        <Text>{item.title}</Text>
                        <Text>by: {item.chef}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
    recipeWrapper:{
        marginBottom:10,
        marginHorizontal:10
    }
})