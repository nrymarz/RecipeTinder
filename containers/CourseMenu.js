import React from 'react'
import { StyleSheet, View} from 'react-native';
import CourseButton from '../components/CourseButton'

export default function CourseMenu({activeCourse, setCourse}){

    return(
        <View style={styles.courseButtonContainer}>
            <CourseButton active={activeCourse === 'All'} course='All' setCourse={setCourse} />
            <CourseButton active={activeCourse === 'Entrees'} course='Entrees' setCourse={setCourse} />
            <CourseButton active={activeCourse === 'Desserts'} course='Desserts' setCourse={setCourse} />
            <CourseButton active={activeCourse === 'Sides'} course= 'Sides' setCourse={setCourse} />
            <CourseButton active={activeCourse === 'Appetizers'} course='Appetizers' setCourse={setCourse} />
        </View>
    )
}

const styles = StyleSheet.create({
    courseButtonContainer:{
        zIndex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        margin:5
    }
})