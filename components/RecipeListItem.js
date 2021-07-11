import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import deleteIcon from '../assets/delete.png'


export default function RecipeListItem({navigation, recipe, deleteRecipe}){
    const windowWidth = Dimensions.get('window').width

    const [height,setHeight] = useState(new Animated.Value(70))
    const rotate = new Animated.Value(0)

    const animatedDelete=() => {
        Animated.timing(height,{
            toValue: 0,
            duration: 200,
            useNativeDriver:false
        }).start(()=> deleteRecipe(recipe.id))
    }

    const shakeIcon = function(){
        Animated.sequence([
            Animated.timing(rotate,{
                toValue:15,
                duration:75,
                useNativeDriver:true
            }),
            Animated.timing(rotate,{
                toValue:-15,
                duration:75,
                useNativeDriver:true
            }),
            Animated.timing(rotate,{
                toValue:0,
                duration:75,
                useNativeDriver:true
            })
        ]).start()
    }   

    const renderRightSwipe = (progress, dragX) =>{
        const rotateDeg = rotate.interpolate({
            inputRange:[-15,15],
            outputRange:[`-15deg`,`15deg`]
        })
        const scale = dragX.interpolate({
            inputRange:[-100,0],
            outputRange:[1,0.65],
            extrapolate:'clamp'
        })
        return(
            <Animated.View style={[styles.recipeWrapper,{width:'100%',backgroundColor:'rgb(250,100,100)', height}]}>
                <View style={styles.deleteIconView}>
                    <Animated.Image source={deleteIcon} style={{height:40,width:40, transform:[{scale},{rotate:rotateDeg}]}} />
                </View>
            </Animated.View>
        )
    }
    
    return(
        <Swipeable renderRightActions={renderRightSwipe} rightThreshold={100} onSwipeableWillOpen={shakeIcon} onSwipeableOpen={animatedDelete} friction={1.5}>
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
        borderRadius:5,
        borderColor: "rgb(225,225,225)"
    },
    deleteIconView:{
        marginLeft:'auto',
        marginRight:5,
        marginTop:'auto',
        marginBottom:'auto',
        paddingHorizontal:5,
    }
})
