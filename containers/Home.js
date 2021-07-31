import React, {useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import findRecipe from '../scraper'
import Queue from '../Queue'
import SwipeableRecipeCard from '../components/SwipeableRecipeCard';
import CourseMenu from './CourseMenu'

const recipes = new Queue()

export default function HomePage({addRecipe}) {

  const [recipe, setRecipe] = useState({})
  const [nextRecipe, setNext] = useState({})
  const [swipedRecipe,setSwipedRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState('All')
  
  useEffect(()=>{
    recipes.clear()
    setSwipedRecipe(null)
    findRecipe(setNext,course)
    findRecipe(setRecipe,course,setLoading)
    for(let i=0;i<10;i++) findRecipe((obj)=>recipes.enqueue(obj),course) 
  },[course])

  const swipe = () =>{
    setSwipedRecipe(recipe)
    setRecipe(nextRecipe)
    setNext(recipes.dequeue())
    findRecipe((obj)=>recipes.enqueue(obj),course)
  }

  return (
    <SafeAreaView style={styles.container} >
      <CourseMenu activeCourse={course} setCourse={setCourse} />
      <View style={styles.cardContainer}>
        {loading ?
          <ActivityIndicator size={100} color='black'/>
        :
          <SwipeableRecipeCard 
            recipe={recipe} 
            swipedRecipe={swipedRecipe} 
            swipe={swipe}
            addRecipe={addRecipe} 
            nextRecipe={nextRecipe}
          />
        }
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
    borderRadius:3
  }
});