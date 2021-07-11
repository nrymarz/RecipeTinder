import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import deleteIcon from '../assets/delete.png'


export default function RecipeListItem({navigation, recipe, deleteRecipe}){
    const windowWidth = Dimensions.get('window').width

    const [height,setHeight] = useState(new Animated.Value(70))

    const animatedDelete=() => {
        Animated.timing(height,{
            toValue: 0,
            duration: 250,
            useNativeDriver:false
        }).start(()=> deleteRecipe(recipe.id))
    }

    const renderRightSwipe = (progress, dragX) =>{
        const scale = dragX.interpolate({
            inputRange:[-100,0],
            outputRange:[1,0.65],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={[{width:'100%',marginVertical:1,backgroundColor:'rgb(250,100,100)', height,overflow:'hidden'}]}>
                <View style={styles.deleteText}>
                    <Animated.Image source={deleteIcon} style={{height:40,width:40, transform:[{scale}]}}></Animated.Image>
                </View>
            </Animated.View>
        )
    }

    return(
        <Swipeable renderRightActions={renderRightSwipe} rightThreshold={100} onSwipeableOpen={animatedDelete} friction={1.75}>
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
        overflow:'hidden',
        borderWidth:1,
        borderRadius:2,
        borderColor: "rgb(225,225,225)"
    },
    deleteText:{
        marginLeft:'auto',
        marginRight:5,
        marginTop:'auto',
        marginBottom:'auto',
        paddingHorizontal:5,
    }
})
