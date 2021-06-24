import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableHighlight } from 'react-native';
import DirectionsList from './DirectionsList'
import IngredientsList from './IngredientsList'

export default function RecipeImage({click, recipe}){
  const {image, title, chef} = recipe
  return(
    <>
      <TouchableHighlight onPress={() => click(true)}>
        <Image
          source={{uri: image}}
          style={{height:500,width:"100%"}}
        />
      </TouchableHighlight>
      <View>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}>{title}</Text>
          <Text style={{textAlign:'center', paddingTop:5}}>{chef}</Text>
      </View>
    </>
  )
}