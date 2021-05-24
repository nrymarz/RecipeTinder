import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import recipes from './TestData'

export default function RecipeContainer() {

  const [recipe, setRecipe] = useState(recipes[0])
  
  const handlePress = () =>{
    setRecipe(recipes[Math.floor(Math.random()*3)])
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
        <Text style={{textAlign: 'center', paddingBottom:"7px"}}>{recipe.title}</Text>
        <Text style={{textAlign: 'center', paddingBottom:"7px"}}>Chef: {recipe.chef}</Text>
        <Text style={{textAlign: 'center'}}>Ingredients:</Text>
        <FlatList data={recipe.ingredients} renderItem={renderIngredients}></FlatList>
        <Text style={{textAlign: 'center'}}>Directions:</Text>
        <FlatList data={recipe.directions} renderItem={renderDirections}></FlatList>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Left" color="brown" style={styles.button} onPress={handlePress}></Button>
        <Button title="Right" color="brown" style={styles.button} onPress ={handlePress}></Button>
      </View>
    </>
  );
}
  
const styles = StyleSheet.create({
  recipeContainer:{
    backgroundColor: "white",
    height:"70%",
    width: "80%"
  },
  buttonContainer:{
    width:"80%",
    flexDirection:'row',
    justifyContent:"space-between"
  }
});