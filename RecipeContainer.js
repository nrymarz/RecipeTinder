import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import recipes from './TestData'

export default function RecipeContainer() {
    return (
      <>
        <View style={styles.recipeContainer}>
          <Text style={{marginHorizontal:"auto"}}>Some Recipe</Text>
        </View>
        <View style={styles.buttonContainer}>
        <Button title="Left" color="brown" style={styles.button}></Button>
        <Button title="Right" color="brown" style={styles.button}></Button>
      </View>
     </>
    );
  }
  
  const styles = StyleSheet.create({
    recipeContainer:{
      backgroundColor: "white",
      height:"70%",
      width: "80%",
      alignContent: "center", 
    },
    buttonContainer:{
      width:"80%",
      flexDirection:'row',
      justifyContent:"space-between"
    }
  });