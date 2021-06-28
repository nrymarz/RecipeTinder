import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableHighlight } from 'react-native';
import left from '../assets/left-arrow.png'
import right from '../assets/right-arrow.png'

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
      <View style={{marginTop:100, flexDirection:'row'}}>
        <Image source={left} style={{width:80, height:50, marginLeft:10}}/>
        <Image source={right} style={{width:80, height:50, marginLeft:'auto', marginRight:10}}/>
      </View>
      <View style={{marginTop:5, flexDirection:'row'}}>
        <Text style={{marginLeft:20}}>Discard</Text>
        <Text style={{marginLeft:'auto',marginRight:20}}>Save</Text>
      </View>
      <Text style={{marginLeft:'auto',marginRight:'auto',marginTop:'auto'}}>Click on the picture for recipe details.</Text>
    </>
  )
}