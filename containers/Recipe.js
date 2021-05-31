import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function Recipe({title, ingredients, directions, chef}){

    return(
        <View>
            <Text>{title}</Text>
            <Text>{chef}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
})