import React,{useState} from 'react'
import { Text, View, FlatList } from 'react-native';

export default function DirectionsList({directions}){
    const [displayFooter, setDisplayFooter] = useState(true)


    const renderFooter = () =>{
        if(displayFooter) return <Text style={{fontWeight:'bold', paddingLeft:5}}>Scroll down to see more directions.</Text>
    }

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
        <View style={{backgroundColor:"antiquewhite", flex:1}} >
            <FlatList 
                ItemSeparatorComponent={directionSeperator} 
                data={directions} 
                renderItem={renderDirections}
                keyExtractor={(item,idx) => item + idx}
                onEndReached={() => setDisplayFooter(false)}
                onEndReachedThreshold={0.1}
            />
            {renderFooter()}
        </View>
    )
}