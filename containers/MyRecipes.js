import React,{useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import RecipeListItem from '../components/RecipeListItem'
import CourseMenu from './CourseMenu'

export default function MyRecipes({navigation, recipes, setRecipes}){

    const [course,setCourse] = useState('All')

    function deleteRecipe(id){
        setRecipes(recipes.filter(r => r.id !== id))
    }

    const renderRecipe = ({item}) =>{
        return <RecipeListItem navigation={navigation} recipe={item} deleteRecipe={deleteRecipe}/>
    }

    const filteredRecipes = () =>{
        switch(course){
            case 'All': return recipes
            case 'Entrees': return recipes.filter(r => r.tags.includes('Main Dish'))
            case 'Desserts': return recipes.filter(r => r.tags.includes('Dessert'))
            case 'Sides': return recipes.filter(r => r.tags.includes('Side Dish'))
            case 'Appetizers': return recipes.filter(r => r.tags.includes('Appetizer'))
        }
    }

    return(
        <SafeAreaView style={{marginHorizontal:5}}>
            <CourseMenu activeCourse={course} setCourse={setCourse} />
            <FlatList 
                data={filteredRecipes()}
                renderItem={renderRecipe}
            />
        </SafeAreaView>
    )
}