import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import recipes from './TestData'

export default function RecipeContainer() {

  const [recipe, setRecipe] = useState(recipes[0])
  
  const handlePress = () =>{
    setRecipe(recipes[Math.floor(Math.random()*3)])
  }

  const renderIngredients = ({item}) =>{
    return <Text key = {item.slice(20)}>{`- ${item}`}</Text>
  }

  const renderDirections = ({item,index}) =>{
    return(
      <Text key={item.slice(20)}>
        <Text style={{fontWeight:"bold"}}>{`${index}. `}</Text>
        <Text>{item}</Text>
      </Text>
    )
  }

  const ingredientSeperator = () =>{
    return(
      <View
        style={{
          height:2,
          width:"100%",
          backgroundColor:'black',
          marginBottom:8
        }}
      />
    )
  }
  return (
    <>
      <View style={styles.recipeContainer}>
        <Text style={{textAlign:'center', paddingTop:12}}>{recipe.title}</Text>
        <Text style={{textAlign:'center', paddingTop:10}}>Chef: {recipe.chef}</Text>
        <Text style={{paddingTop:10}}>Ingredients:</Text>
        <FlatList data={recipe.ingredients} style={{backgroundColor:'lightgreen'}} renderItem={renderIngredients}></FlatList>
        <Text style={{paddingTop:15}}>Directions:</Text>
        <FlatList style={{backgroundColor:"pink"}} ItemSeparatorComponent={ingredientSeperator} data={recipe.directions} renderItem={renderDirections}></FlatList>
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