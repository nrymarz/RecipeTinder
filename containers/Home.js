import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import findRecipe from '../scraper'
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function HomePage({navigation, addRecipe}) {


  const [clicked,click] = useState(true)
  const [nextRecipe, setNext] = useState({})
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    findRecipe(setRecipe, setLoading)
    findRecipe(setNext)
  },[])
  
  const handlePressRight = () =>{
    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.chef === recipe.chef && r.title === recipe.title)) return [...prevRecipes, recipe]
      else return prevRecipes
    })
    setRecipe(nextRecipe)
    findRecipe(setNext)
  }

  const handlePressLeft = () =>{
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

  const renderNextRecipe = () =>{
    return(
      <View>
        <View>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}>{loading ? "Loading..." : nextRecipe.title}</Text>
          <Text style={{textAlign:'center', paddingTop:5}}>{loading ? "" : nextRecipe.chef}</Text>
        </View>
        <Text style={{paddingTop:10, fontWeight:"bold"}}>Ingredients</Text>
        <FlatList
          data={loading ? ["Loading..."] : nextRecipe.ingredients} 
          style={{backgroundColor:'lightgreen', maxHeight:"38%"}} 
          renderItem={renderIngredients}
          keyExtractor={(item,idx) => item + idx}
        />
        <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
        <FlatList 
          style={{backgroundColor:"pink", maxHeight:"40%"}} 
          ItemSeparatorComponent={directionSeperator} 
          data={loading ? ["Loading..."] : nextRecipe.directions} 
          renderItem={renderDirections}
          keyExtractor={item => item}
        />
    </View>
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

  return (
    <View style={styles.container} >
      <View style={{height:"5%"}}>
        <Button title ="Go to My Recipes" onPress={()=>navigation.navigate('My Recipes')}></Button>
      </View>
        <Swipeable 
           containerStyle={styles.recipeContainer}
          // renderLeftActions={renderNextRecipe}
          // onSwipeableLeftOpen={handlePressLeft}
          // renderRightActions={renderNextRecipe}
        >
           {clicked ? renderRecipe() : renderImage()}
        </Swipeable>
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