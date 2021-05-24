import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import recipes from './TestData'

export default function RecipeContainer() {

  const [recipe, setRecipe] = useState(recipes[0])
  
  const handlePress = () =>{
    setRecipe(recipes[Math.floor(Math.random()*4)])
  }

  const renderIngredients = ({item}) =>{
    return <Text>{`- ${item}`}</Text>
  }

  const renderDirections = ({item,index}) =>{
    return <Text>{`${index}. ${item}`}</Text>
  }
  return (
    <>
      <View style={styles.recipeContainer}>
        <Text>{recipe.title}</Text>
        <Text>{recipe.chef}</Text>
        <Text>Ingredients:</Text>
        <FlatList data={recipe.ingredients} renderItem={renderIngredients}></FlatList>
        <Text>Directions:</Text>
        <FlatList data={recipe.directions} renderItem={renderDirections}></FlatList>
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