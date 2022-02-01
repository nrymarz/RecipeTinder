import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS} from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import deleteIcon from '../assets/delete.png'


export default function RecipeListItem({navigation, recipe, deleteRecipe}){
    const windowWidth = Dimensions.get('window').width

    //const height = new Animated.Value(70)
    //const rotate = new Animated.Value(0)
    const height = useSharedValue(70)

    const rotate = useSharedValue(0)

    // const animatedDelete=() => {
    //     Animated.timing(height,{
    //         toValue: 0,
    //         duration: 200,
    //         useNativeDriver:false
    //     }).start(()=> deleteRecipe(recipe.id))
    // }

    const animatedDelete = () =>{
        height.value = withTiming(0,undefined,()=> runOnJS(deleteRecipe)(recipe.id))
    }

    const animatedHeight = useAnimatedStyle(() =>{
        return {
            height: height.value
        }
    })

    const renderRightSwipe = (progress, dragX) =>{

        return(
            <Animated.View style={[styles.recipeWrapper,{backgroundColor:'rgb(250,100,100)'},animatedHeight]}>
                <View style={styles.deleteIconView}>
                    <Animated.Image source={deleteIcon} style={{height:40,width:40}} />
                </View>
            </Animated.View>
        )
    }
    
    return(
        <Swipeable renderRightActions={renderRightSwipe} rightThreshold={100} onSwipeableOpen={animatedDelete} friction={1.5}>
            <TouchableHighlight onPress={()=>navigation.navigate('Recipe Page',{recipe})} >
                <Animated.View style={[styles.recipeWrapper, {backgroundColor:"rgb(225,225,225)"}, animatedHeight]}>
                    <Image source={{uri: recipe.image}} style={{width:70, height:'100%', marginRight:10}}/>
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
        overflow:'hidden',
        borderWidth:0,
        borderRadius:5
    },
    deleteIconView:{
        marginLeft:'auto',
        marginRight:5,
        marginTop:'auto',
        marginBottom:'auto',
        paddingHorizontal:5,
    }
})
