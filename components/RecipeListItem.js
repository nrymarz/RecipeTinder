import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export default function RecipeListItem({navigation, recipe, index, deleteRecipe}){
    const windowWidth = Dimensions.get('window').width

    const [height,setHeight] = useState(new Animated.Value(70))

    // const reverseWidth = width.interpolate({
    //     inputRange:[120,windowWidth],
    //     outputRange:[windowWidth,0]
    // })

    const animatedDelete=() => {
        Animated.timing(height,{
            toValue: 0,
            duration: 200,
            useNativeDriver:false
        }).start(()=> deleteRecipe(recipe.id))
    }

    const renderRightSwipe = (progress, dragX) =>{
        const translateX = dragX.interpolate({
            inputRange:[-120,0],
            outputRange:[0,120],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={[{marginVertical:1,backgroundColor:'rgb(250,0,0)', height,overflow:'hidden'}]}>
                <Text onPress={animatedDelete} style={styles.deleteText}>Delete Recipe</Text>
            </Animated.View>
        )
    }

    return(
        <Swipeable renderRightActions={renderRightSwipe} friction={1.75}>
            <TouchableHighlight onPress={()=>navigation.navigate('Recipe Page',{recipe})} >
                <Animated.View style={[styles.recipeWrapper, {height, backgroundColor:"rgb(225,225,225)"}]}>
                    <Image source={{uri: recipe.image}} style={{width:70, height:70, marginRight:10}}/>
                    <View style={{alignContent:'center',justifyContent:"center", width:windowWidth-90}}>
                        <Text>{recipe.title}</Text>
                        <Text>by: {recipe.chef}</Text>
                    </View>
                </Animated.View>
            </TouchableHighlight>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    recipeWrapper:{
        flex:1,
        flexDirection:'row',
        marginVertical: 1,
        overflow:'hidden'
    },
    deleteText:{
        marginLeft:'auto',
        marginRight:'auto',
        fontWeight:'bold',
        marginTop:'auto',
        marginBottom:'auto',
        paddingHorizontal:5
    }
})
