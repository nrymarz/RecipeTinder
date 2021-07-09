import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export default function MyRecipes({navigation, recipes}){
    const renderLeftSwipe = (progress, dragX) =>{
        const translateX = dragX.interpolate({
            inputRange:[0,110],
            outputRange:[-100,0],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={{backgroundColor:'rgb(250,0,0)', transform:[{translateX}]}}>
                <Text style={{paddingHorizontal:5,fontWeight:'bold',marginTop:'auto',marginBottom:'auto'}}>Delete Recipe</Text>
            </Animated.View>
        )
    }

    const renderRecipe = ({item, index}) =>{
        return(
            <Swipeable renderLeftActions={renderLeftSwipe}>
                <TouchableOpacity style={[styles.recipeWrapper, {backgroundColor: index%2===0 ? "rgb(210,210,210)" : "rgb(225,225,225)"}]} onPress={ () => navigation.navigate('Recipe Page',{recipe: item})} >
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Image source={{uri: item.image}} style={{width:70,height:70, marginRight:10}}/>
                        <View style={{alignContent:'center',justifyContent:"center", width:"80%"}}>
                            <Text>{item.title}</Text>
                            <Text>by: {item.chef}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
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
        marginVertical: 2
    }
})