import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableHighlight } from 'react-native';

export default function RecipeImage({click, recipe}){
  const {image, title, chef} = recipe
  return(
    <>
      <TouchableHighlight onPress={() => click(true)}>
        <Image
          source={{uri: image}}
          style={{height:400,width:"100%", resizeMode:'cover'}}
        />
      </TouchableHighlight>
      <View>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:20}}>{title}</Text>
          <Text style={{textAlign:'center', paddingTop:8, fontSize:18}}>{chef}</Text>
      </View>
    </>
  )
}