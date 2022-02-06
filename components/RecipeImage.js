import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableOpacity } from 'react-native';

export default function RecipeImage({click, recipe}){
  if(!recipe) return null
  const {image, title, chef} = recipe
  return(
    <View style ={styles.recipeCardFront}>
      <TouchableOpacity activeOpacity={.75} onPress={() =>click ? click(true) : null}>
        <Image
          source={{uri: image}}
          style={{height:400,width:"100%", resizeMode:'cover'}}
        />
      </TouchableOpacity>
      <View style={{marginHorizontal:10}}>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:20}}>{title}</Text>
          <Text style={{textAlign:'center', paddingTop:8, fontSize:18}}>{chef}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recipeCardFront:{
    flex:1,
    backgroundColor:'rgb(235,235,235)',
  }
})