import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';


export default function MyRecipes({navigation, recipes}){
    const renderRecipe = ({item}) =>{
        return(
            <TouchableOpacity style={{marginBottom:10, backgroundColor:"silver" }} onPress={ () => navigation.navigate('Recipe Page',{recipe: item})} >
                <View style={{flex:1, flexDirection:'row'}}>
                    <Image source={{uri: item.image}} style={{width:70,height:70,marginLeft:5,marginRight:10}}/>
                    <View style={{alignContent:'center',justifyContent:"center"}}>
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

})