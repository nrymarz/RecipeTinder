import React, {useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import findRecipe from '../scraper'
import Queue from '../Queue'
import SwipeableRecipeCard from '../components/SwipeableRecipeCard';
import CourseMenu from './CourseMenu'

const recipes = new Queue()

export default function HomePage({addRecipe}) {
  const [visibleRecipes,setVisibleRecipes] = useState({next:{},current:{},swiped:null})
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState('All')

  const setNext = (recipe)=> setVisibileRecipes(prevRecipes => ({...prevRecipes,next: recipe}))
  const setCurrent = (recipe) => setVisibileRecipes(prevRecipes => ({...prevRecipes,current: recipe}))
  
  useEffect(()=>{
    recipes.clear()
    setVisibleRecipes({next:{},current:{},swiped:null})
    findRecipe(setNext,course)
    findRecipe(setCurrent,course,setLoading)
    for(let i=0;i<10;i++) findRecipe((obj)=>recipes.enqueue(obj),course) 
  },[course])

  const swipe = () =>{
    setVisibileRecipes(prevRecipes =>{
      return {current:prevRecipes.next,swiped:prevRecipes.current,next:recipes.dequeue()}
    })
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
            recipe={visibleRecipes.current} 
            swipedRecipe={visibleRecipes.swiped} 
            swipe={swipe}
            addRecipe={addRecipe} 
            nextRecipe={visibleRecipes.next}
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