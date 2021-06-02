import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function Recipe({route}){
    const {title, chef, ingredients, directions} = route.params.recipe

    const renderIngredients = ({item}) =>{
        return <Text>{`- ${item}`}</Text>
      }
    
    const renderDirections = ({item,index}) =>{
    return(
        <Text >
        <Text style={{fontWeight:"bold"}}>{`${index}. `}</Text>
        <Text>{item}</Text>
        </Text>
    )}

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
    )}

    return(
        <View style={styles.container}>
            <Text style={{textAlign:'center', paddingTop:12, fontWeight:"700", fontSize:15}}>{title}</Text>
            <Text style={{textAlign:'center', paddingTop:10}}>{chef}</Text>
            <Text style={{paddingTop:15, fontWeight:"bold"}}>Ingredients</Text>
            <FlatList 
                data={ingredients} 
                style={{backgroundColor:'lightgreen'}} 
                renderItem={renderIngredients}
                keyExtractor={item => item}
            />
            <Text style={{paddingTop:15, fontWeight:"bold"}}>Directions</Text>
            <FlatList 
                style={{backgroundColor:"pink"}} 
                ItemSeparatorComponent={directionSeperator} 
                data={directions} 
                renderItem={renderDirections}
                keyExtractor={item => item}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'orange',
        height:"100%"
    }
})