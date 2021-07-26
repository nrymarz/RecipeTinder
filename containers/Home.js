import React, {useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View} from 'react-native';
import findRecipe from '../scraper'
import RecipeCard from '../components/RecipeCard';
import Queue from '../Queue'
import SwipeableRecipeCard from '../components/SwipeableRecipeCard';

const recipes = new Queue()

export default function HomePage({addRecipe}) {

  const [recipe, setRecipe] = useState({})
  const [nextRecipe, setNext] = useState({})
  const [swipedRecipe,setSwipedRecipe] = useState(null)
  const [loading, setLoading] = useState(true)


  
  useEffect(()=>{
    findRecipe(setNext)
    findRecipe(setRecipe, setLoading)
    for(let i=0;i<10;i++) findRecipe((obj)=>recipes.enqueue(obj)) 
  },[])

  useEffect(() =>{
    setNext(recipes.dequeue())
    findRecipe((obj)=>recipes.enqueue(obj))
  },[recipe])
 
  if(loading){
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={{fontSize:25}}>Loading...</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.cardContainer}>
        <RecipeCard recipe={nextRecipe} />
        <SwipeableRecipeCard recipe={recipe} swipedRecipe={swipedRecipe} setRecipe={setRecipe} setSwipedRecipe={setSwipedRecipe} addRecipe={addRecipe}/>
      </View>
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    margin:10
  },
  cardContainer:{
    flex:1,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center'
  }
});