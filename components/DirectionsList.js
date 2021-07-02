import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function DirectionsList({directions}){
    const renderDirections = ({item,index}) =>{
        return(
        <Text style={{paddingLeft:5,paddingTop:3}}>
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

    return(
        <FlatList 
            style={{backgroundColor:"rgb(250,220,100)", maxHeight:"42%"}} 
            ItemSeparatorComponent={directionSeperator} 
            data={directions} 
            renderItem={renderDirections}
            keyExtractor={(item,idx) => item + idx}
        />
    )

}