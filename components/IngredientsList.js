import React, {useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function IngredientsList({ingredients}){
    const [displayFooter, setDisplayFooter] = useState(true)


    const renderFooter = () =>{
        if(displayFooter) return <Text style={{fontWeight:'bold', paddingLeft:5}}>Scroll down to see more ingredients.</Text>
    }

    const renderIngredients = ({item}) =>{
        return <Text style={{paddingLeft:5,paddingTop:1}}>{`- ${item}`}</Text>
    }

    return(
        <View style={{backgroundColor:"rgb(220,220,220)", maxHeight:"41%"}} >
            <FlatList
                data={ingredients} 
                renderItem={renderIngredients}
                keyExtractor={(item,idx) => item + idx}
                onEndReached={() => setDisplayFooter(false)}
                onEndReachedThreshold={0.1}
            />
            {renderFooter()}
        </View>
    )
}