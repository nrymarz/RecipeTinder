import React, {useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Button} from 'react-native';
import findRecipe from '../scraper'
import Queue from '../Queue'
import SwipeableRecipeCard from '../components/SwipeableRecipeCard';

const recipes = new Queue()

export default function HomePage({addRecipe}) {

  const [recipe, setRecipe] = useState({})
  const [nextRecipe, setNext] = useState({})
  const [swipedRecipe,setSwipedRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState('ALL')
  
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
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={{fontSize:25}}>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={{flexDirection:'row',justifyContent:'space-between', width:"100%",margin:5}}>
        <Button style={styles.courseButton} title="All" onPress={() => setCourse("All")}></Button>
        <Button style={styles.courseButton} title="Entrees" onPress={() => setCourse("Entrees")}></Button>
        <Button style={styles.courseButton} title="Desserts" onPress={() => setCourse("Desserts")}></Button>
        <Button style={styles.courseButton} title="Sides" onPress={() => setCourse("Sides")}></Button>
        <Button style={styles.courseButton} title="Appetizers" onPress={() => setCourse("Appetizers")}></Button>
      </View>
      <View style={styles.cardContainer}>
        <SwipeableRecipeCard recipe={recipe} swipedRecipe={swipedRecipe} setRecipe={setRecipe} setSwipedRecipe={setSwipedRecipe} addRecipe={addRecipe} nextRecipe={nextRecipe} />
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
  },
  courseButton:{
    borderRadius:3
  }
});