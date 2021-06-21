import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableHighlight } from 'react-native';
import findRecipe from '../scraper'
import {PanGestureHandler} from 'react-native-gesture-handler';

export default function HomePage({navigation, addRecipe}) {


  const [clicked,click] = useState(false)
  const [nextRecipe, setNext] = useState({})
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    findRecipe(setRecipe, setLoading)
    findRecipe(setNext)
  },[])
  
  const handlePressRight = () =>{
    click(false)
    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.chef === recipe.chef && r.title === recipe.title)) return [...prevRecipes, recipe]
      else return prevRecipes
    })
    setRecipe(nextRecipe)
    findRecipe(setNext)
  }

  const handlePressLeft = () =>{
    click(false)
    setRecipe(nextRecipe)
    findRecipe(setNext)
  }

  const renderIngredients = ({item}) =>{
    return <Text>{`- ${item}`}</Text>
  }

  const renderDirections = ({item,index}) =>{
    return(
      <Text >
        <Text style={{fontWeight:"bold"}}>{`${index+1}. `}</Text>
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
  
  function renderRecipe(){
    return(
      <>
        <View>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}>{loading ? "Loading..." : recipe.title}</Text>
          <Text style={{textAlign:'center', paddingTop:5}}>{loading ? "" : recipe.chef}</Text>
        </View>
        <Text style={{paddingTop:10, fontWeight:"bold"}}>Ingredients</Text>
        <FlatList
          data={loading ? ["Loading..."] : recipe.ingredients} 
          style={{backgroundColor:'lightgreen', maxHeight:"38%"}} 
          renderItem={renderIngredients}
          keyExtractor={(item,idx) => item + idx}
        />
        <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
        <FlatList 
          style={{backgroundColor:"pink", maxHeight:"40%"}} 
          ItemSeparatorComponent={directionSeperator} 
          data={loading ? ["Loading..."] : recipe.directions} 
          renderItem={renderDirections}
          keyExtractor={item => item}
        />
      </>
    )
  }

  function renderImage(){
    return(
      <>
      <TouchableHighlight onPress={() => click(true)}>
        <Image
          source={{uri: recipe.image}}
          style={{height:500,width:"100%"}}
        />
      </TouchableHighlight>
      <View>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}>{loading ? "Loading..." : recipe.title}</Text>
          <Text style={{textAlign:'center', paddingTop:5}}>{loading ? "" : recipe.chef}</Text>
      </View>
      </>
    )
  }

  return (
    <View style={styles.container} >
      <View style={{height:"5%"}}>
        <Button title ="Go to My Recipes" onPress={()=>navigation.navigate('My Recipes')}></Button>
      </View>
      <PanGestureHandler
        onGestureEvent={handlePressLeft}
        minDist={10}
      >
        <View style={styles.recipeContainer}>
            {clicked ? renderRecipe() : renderImage()}
        </View>
      </PanGestureHandler>
      <View style={styles.buttonContainer}>
        <Button title="Left" color="brown" style={styles.button} onPress={handlePressLeft}></Button>
        <Button title="Right" color="brown" style={styles.button} onPress ={handlePressRight}></Button>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer:{
    flex:1,
    backgroundColor: 'rgba(250,250,250,.85)',
    width:"100%"
  },
  buttonContainer:{
    height:"5%",
    width:"100%",
    flexDirection:'row',
    justifyContent:"space-between"
  }
});