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
  const [course, setCourse] = useState('All')
  
  useEffect(()=>{
    findRecipe(setNext,course)
    findRecipe(setRecipe,course, setLoading)
    for(let i=0;i<10;i++) findRecipe((obj)=>recipes.enqueue(obj),course) 
  },[])

  useEffect(() =>{
    setNext(recipes.dequeue())
    findRecipe((obj)=>recipes.enqueue(obj),course)
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
        <Button 
          color={course === "All" ? "rgb(100,100,100)" : "rgb(165,165,165)"} 
          style={styles.courseButton} title="All" 
          onPress={() => setCourse("All")}>
        </Button>
        <Button 
          color={course === "Entrees" ? "rgb(100,100,100)" : "rgb(165,165,165)"} 
          style={styles.courseButton} title="Entrees" 
          onPress={() => setCourse("Entrees")}>
        </Button>
        <Button 
          color={course === "Desserts" ? "rgb(100,100,100)" : "rgb(165,165,165)"} 
          style={styles.courseButton} title="Desserts" 
          onPress={() => setCourse("Desserts")}>
        </Button>
        <Button 
          color={course === "Sides" ? "rgb(100,100,100)" : "rgb(165,165,165)"} 
          style={styles.courseButton} title="Sides" 
          onPress={() => setCourse("Sides")}>
        </Button>
        <Button 
          color={course === "Appetizers" ? "rgb(100,100,100)" : "rgb(165,165,165)"} 
          style={styles.courseButton} title="Appetizers" 
          onPress={() => setCourse("Appetizers")}>
        </Button>
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
    zIndex:1,
    flex:1,
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  courseButton:{
    borderRadius:3,
  }
});