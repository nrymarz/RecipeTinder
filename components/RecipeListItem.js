import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function RecipeListItem({recipe, index}){
    const translateY = new Animated.Value(0)

    const renderLeftSwipe = (id, dragX) =>{
        const translateX = dragX.interpolate({
            inputRange:[0,110],
            outputRange:[-100,0],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={{backgroundColor:'rgb(250,0,0)', transform:[{translateX}]}}>
                <Text onPress={() => deleteRecipe(id)} style={{paddingHorizontal:5,fontWeight:'bold',marginTop:'auto',marginBottom:'auto'}}>Delete Recipe</Text>
            </Animated.View>
        )
    }

    return(
        <Swipeable renderLeftActions={(progress,dragX) => renderLeftSwipe(recipe.id,dragX)} friction={1.75}>
            <TouchableOpacity style={[styles.recipeWrapper, {backgroundColor: index%2===0 ? "rgb(210,210,210)" : "rgb(225,225,225)"}]} onPress={ () => navigation.navigate('Recipe Page',{recipe: item})} >
                <Animated.View style={{flex:1, flexDirection:'row',transform:[{translateY}]}}>
                    <Image source={{uri: recipe.image}} style={{width:70,height:70, marginRight:10}}/>
                    <View style={{alignContent:'center',justifyContent:"center", width:"80%"}}>
                        <Text>{recipe.title}</Text>
                        <Text>by: {recipe.chef}</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    recipeWrapper:{
        marginHorizontal:2,
        marginVertical: 2
    }
})