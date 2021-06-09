import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import findRecipe from '../scraper'

export default function HomePage({navigation, addRecipe}) {

  const [recipe, setRecipe] = useState({})

  useEffect(()=>{
    findRecipe(setRecipe)
  },[])
  
  const handlePressRight = () =>{
    findRecipe(setRecipe)
    addRecipe(prevRecipes => [...prevRecipes, recipe])
  }

  const handlePressLeft = () =>{
    findRecipe(setRecipe)
  }

  const renderIngredients = ({item}) =>{
    return <Text>{`- ${item}`}</Text>
  }

  const renderDirections = ({item,index}) =>{
    return(
      <Text >
        <Text style={{fontWeight:"bold"}}>{`${index}. `}</Text>
        <Text>{item}</Text>
      </Text>
    )
  }

  const directionSeperator = () =>{
    return(
      <View
        style={{
          height:2,
          width:"100%",
          backgroundColor:'black',
          marginBottom:4,
          marginTop:4
        }}
      />
    )
  }
  
  return (
    <View style={styles.container}>
      <Button title ="Go to My Recipes" onPress={()=>navigation.navigate('My Recipes')}></Button>
      <View style={styles.recipeContainer}>
        <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}>{recipe.title}</Text>
        <Text style={{textAlign:'center', paddingTop:10}}>{recipe.chef}</Text>
        <Text style={{paddingTop:10, fontWeight:"bold"}}>Ingredients</Text>
        <FlatList 
          data={recipe.ingredients} 
          style={{backgroundColor:'lightgreen'}} 
          renderItem={renderIngredients}
          keyExtractor={(item,idx) => item + idx}
        />
        <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
        <FlatList 
          style={{backgroundColor:"pink"}} 
          ItemSeparatorComponent={directionSeperator} 
          data={recipe.directions} 
          renderItem={renderDirections}
          keyExtractor={item => item}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Left" color="brown" style={styles.button} onPress={handlePressLeft}></Button>
        <Button title="Right" color="brown" style={styles.button} onPress ={handlePressRight}></Button>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer:{
    backgroundColor: 'rgba(250,250,250,.85)',
    height:"70%",
    width: "100%"
  },
  buttonContainer:{
    width:"100%",
    flexDirection:'row',
    justifyContent:"space-between"
  }
});