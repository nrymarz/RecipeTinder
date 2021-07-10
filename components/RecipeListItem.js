import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function RecipeListItem({navigation, recipe, index, deleteRecipe}){

    const [maxHeight, setMaxHeight] = useState(new Animated.Value(100))

    const animatedDelete= ()=>{
        Animated.timing(maxHeight,{
            toValue: 0,
            duration: 400,
            useNativeDriver:false
        }).start(()=> deleteRecipe(recipe.id))
    }

    const renderRightSwipe = (progress, dragX) =>{
        const translateX = dragX.interpolate({
            inputRange:[-108,0],
            outputRange:[0,108],
            extrapolate:'clamp'
        })
        console.log(dragX)
        return(
            <Animated.View style={[{backgroundColor:'rgb(250,0,0)',transform:[{translateX}]}]}>
                <Text onPress={animatedDelete} style={{paddingHorizontal:5,fontWeight:'bold',marginTop:'auto',marginBottom:'auto'}}>Delete Recipe</Text>
            </Animated.View>
        )
    }

    return(
        <Swipeable renderRightActions={renderRightSwipe} friction={1.75}>
            <TouchableOpacity style={[styles.recipeWrapper, {backgroundColor: index%2===0 ? "rgb(210,210,210)" : "rgb(225,225,225)"}]} onPress={ () => navigation.navigate('Recipe Page',{recipe})} >
                <Image source={{uri: recipe.image}} style={{width:70, height:70, marginRight:10}}/>
                <View style={{alignContent:'center',justifyContent:"center", width:"82%"}}>
                    <Text>{recipe.title}</Text>
                    <Text>by: {recipe.chef}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    recipeWrapper:{
        flex:1,
        flexDirection:'row',
        marginVertical: 1
    }
})

//<TouchableOpacity onPress={ () => navigation.navigate('Recipe Page',{recipe})} >