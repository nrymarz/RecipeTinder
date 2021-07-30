import React from 'react'
import { StyleSheet, Button} from 'react-native';

export default function CourseButton({active, course, setCourse}){

    return(
        <Button 
          color={active ? "rgb(100,100,100)" : "rgb(165,165,165)"} 
          style={styles.courseButton} title={course}
          onPress={() => setCourse(course)}>
        </Button>
    )
}

const styles = StyleSheet.create({
    courseButton:{
        borderRadius:3
    }
})