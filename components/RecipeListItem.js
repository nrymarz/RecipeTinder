import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight } from 'react-native';
import Animated, 
    { 
        useAnimatedStyle,
        useSharedValue, 
        useDerivedValue, 
        withTiming, 
        runOnJS, 
        useAnimatedGestureHandler,
        interpolate, 
        Extrapolation,  
        withSequence
    } from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import deleteIcon from '../assets/delete.png'

const ITEM_HEIGHT = 70

export default function RecipeListItem({navigation, recipe, deleteRecipe}){
    const windowWidth = Dimensions.get('window').width
    const height = useSharedValue(ITEM_HEIGHT)
    const translateX = useSharedValue(0)
    const rotation = useSharedValue(0)
    const scale = useDerivedValue(() => interpolate(translateX.value,[-100,0],[1,0.5],{extrapolateLeft: Extrapolation.CLAMP}))
    const ref = useRef(null)
    const animatedDelete = () =>{
        'worklet'
        height.value = withTiming(0,undefined,()=> runOnJS(deleteRecipe)(recipe.id))
    }

    const animatedHeight = useAnimatedStyle(() =>{
        return {
            height: height.value,
            transform:[{translateX: translateX.value}]
        }
    })

    const jingleAnimation = () =>{
        'worklet'
        rotation.value = withSequence(withTiming(12),withTiming(-12),withTiming(0))
    }

    const animatedIconStyle = useAnimatedStyle(()=>({transform:[{scale: scale.value},{rotate: `${rotation.value} deg`}]}))
    
    const handleSwipe = useAnimatedGestureHandler({
        onStart:(_,ctx) =>{
            ctx.jingled = false
        },
        onActive: (e,ctx) =>{
            if(e.translationX < 0) translateX.value = e.translationX
            if(!ctx.jingled && e.translationX < -100){
                ctx.jingled = true
                jingleAnimation()
            }
            else if(e.translationX > -100) ctx.jingled = false
        },
        onEnd: e =>{
            if(e.translationX < -100){
                translateX.value = withTiming(-windowWidth)
                animatedDelete()
            }
            else translateX.value = withTiming(0)
        }
    })
    
    return(
        <>
            <Animated.Image source={deleteIcon} style={[styles.deleteIcon,{height:40,width:40},animatedIconStyle]} />
            <TouchableHighlight ref={ref} onPress={()=>navigation.navigate('Recipe Page',{recipe})}>
                <PanGestureHandler onGestureEvent={handleSwipe} minDist={20} simultaneousHandlers={ref}>
                    <Animated.View style={[styles.recipeWrapper, {backgroundColor:"rgb(225,225,225)"}, animatedHeight]}>
                        <Image source={{uri: recipe.image}} style={{width:70, height:'100%', marginRight:10}}/>
                        <View style={{alignContent:'center',justifyContent:"center", width:windowWidth-90}}>
                            <Text>{recipe.title}</Text>
                            <Text>by: {recipe.chef}</Text>
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </TouchableHighlight>
        </>
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
    deleteIcon:{
        right:20,
        top:(ITEM_HEIGHT-40)/2,
        position:'absolute'
    }
})
