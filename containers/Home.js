import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import findRecipe from '../scraper'
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function HomePage({navigation, addRecipe}) {

  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    findRecipe(setRecipe, setLoading)
  },[])
  
  const handlePressRight = () =>{
    addRecipe(prevRecipes =>{
      if(!prevRecipes.find(r => r.chef === recipe.chef && r.title === recipe.title)) return [...prevRecipes, recipe]
      else return prevRecipes
    })
    setLoading(true)
    findRecipe(setRecipe, setLoading)
  }

  const handlePressLeft = () =>{
    setLoading(true)
    findRecipe(setRecipe, setLoading)
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
      <Swipeable style={{width:"100%",backgroundColor:"blue"}}
        onSwipeableLeftOpen={handlePressLeft}>
        <View style={styles.recipeContainer}>
          <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}>{loading ? "Loading..." : recipe.title}</Text>
          <Text style={{textAlign:'center', paddingTop:5}}>{loading ? "" : recipe.chef}</Text>
          <Image style={{width:100, height:80}} source={recipe.image}/>
          <Text style={{paddingTop:10, fontWeight:"bold"}}>Ingredients</Text>
          <FlatList 
            data={loading ? ["Loading..."] : recipe.ingredients} 
            style={{backgroundColor:'lightgreen'}} 
            renderItem={renderIngredients}
            keyExtractor={(item,idx) => item + idx}
          />
          <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
          <FlatList 
            style={{backgroundColor:"pink"}} 
            ItemSeparatorComponent={directionSeperator} 
            data={loading ? ["Loading..."] : recipe.directions} 
            renderItem={renderDirections}
            keyExtractor={item => item}
          />
        </View>
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
    backgroundColor: 'rgba(250,250,250,.85)',
    flex:1
  },
  buttonContainer:{
    height:60,
    width:"100%",
    flexDirection:'row',
    justifyContent:"space-between"
  }
});