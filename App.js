import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{paddingBottom:15}}>Some Recipe</Text>
      <View style={[styles.recipeContainer]}>

      </View>
      <View style={styles.buttonContainer}>
        <Button title="Left" color="brown" style={styles.button}></Button>
        <Button title="Right" color="brown" style={styles.button}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer:{
    backgroundColor: "black",
    height:"70%",
    width: "80%"
  },
  buttonContainer:{
    width:"80%",
    flexDirection:'row',
    justifyContent:"space-between"
  }
});
