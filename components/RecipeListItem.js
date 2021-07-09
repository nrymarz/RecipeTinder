import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function RecipeListItem({recipe, index, deleteRecipe}){
    const translateX = new Animated.Value(0)

    function animatedDelete(){
        Animated.timing(translateX,{
            toValue: 400,
            duration: 400,
            useNativeDriver:true
        }).start(()=>deleteRecipe(recipe.id))
    }

    const renderLeftSwipe = (progress, dragX) =>{
        const translateX = dragX.interpolate({
            inputRange:[0,106],
            outputRange:[-100,0],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={[styles.recipeWrapper,{backgroundColor:'rgb(250,0,0)', transform:[{translateX}]}]}>
                <Text onPress={() => animatedDelete()} style={{paddingHorizontal:5,fontWeight:'bold',marginTop:'auto',marginBottom:'auto'}}>Delete Recipe</Text>
            </Animated.View>
        )
    }

    return(
        <Swipeable renderLeftActions={renderLeftSwipe} friction={1.75}>
            <Animated.View style={[styles.recipeWrapper, {backgroundColor: index%2===0 ? "rgb(210,210,210)" : "rgb(225,225,225)",transform:[{translateX}]}]}>
            <TouchableOpacity onPress={ () => navigation.navigate('Recipe Page',{recipe: item})} >
                <Animated.View style={{flex:1, flexDirection:'row'}}>
                    <Image source={{uri: recipe.image}} style={{width:70,height:70, marginRight:10}}/>
                    <View style={{alignContent:'center',justifyContent:"center", width:"80%"}}>
                        <Text>{recipe.title}</Text>
                        <Text>by: {recipe.chef}</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
            </Animated.View>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    recipeWrapper:{
        marginVertical: 2
    }
})