import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import recipes from './TestData'

export default function RecipeContainer() {

  [recipe, setRecipe] = useState(recipes[0])

  handlePress = () =>{
    setRecipe(recipes[Math.floor(Math.random()*4)])
  }
  return (
    <>
      <View style={styles.recipeContainer}>
        <Text>Some Recipe</Text>
        <Text>Ingredients:
          <FlatList>{recipe.ingredients}</FlatList>
        </Text>
        <Text>Directions:
          <FlatList>{recipe.diretions}</FlatList>
        </Text>
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