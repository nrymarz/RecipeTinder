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

    const renderLeftSwipe = (progress, dragX) =>{
        const translateX = dragX.interpolate({
            inputRange:[0,106],
            outputRange:[-100,0],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={[styles.recipeWrapper,{backgroundColor:'rgb(250,0,0)',height:"100%",transform:[{translateX}]}]}>
                <Text onPress={animatedDelete} style={{paddingHorizontal:5,fontWeight:'bold',marginTop:'auto',marginBottom:'auto'}}>Delete Recipe</Text>
            </Animated.View>
        )
    }

    return(
        <Swipeable renderLeftActions={renderLeftSwipe} friction={1.75}>
            <TouchableOpacity onPress={ () => navigation.navigate('Recipe Page',{recipe})} >
                <Animated.View style={[styles.recipeWrapper,{flex:1, flexDirection:'row', backgroundColor: index%2===0 ? "rgb(210,210,210)" : "rgb(225,225,225)", maxHeight}]}>
                    <Image source={{uri: recipe.image}} style={{width:70,height:"100%", marginRight:10}}/>
                    <View style={{alignContent:'center',justifyContent:"center", width:"80%",overflow:'hidden'}}>
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
        height:70,
        marginVertical: 1
    }
})