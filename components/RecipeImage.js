import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableHighlight } from 'react-native';
import left from '../assets/left-arrow.png'
import right from '../assets/right-arrow.png'

export default function RecipeImage({click, recipe}){
  if(!recipe) return null
  const {image, title, chef} = recipe
  return(
    <>
      <TouchableHighlight onPress={() =>click ? click(true) : null}>
        <Image
          source={{uri: image}}
          style={{height:400,width:"100%", resizeMode:'cover'}}
        />
      </TouchableHighlight>
      <View style={{marginHorizontal:10}}>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:20}}>{title}</Text>
          <Text style={{textAlign:'center', paddingTop:8, fontSize:18}}>{chef}</Text>
      </View>
    </>
  )
}