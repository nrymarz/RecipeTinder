import React,{useState, useRef} from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeListItem from '../components/RecipeListItem'
import CourseMenu from './CourseMenu'

export default function MyRecipes({navigation, recipes, setRecipes}){

    const [course,setCourse] = useState('All')
    const listRef = useRef(null)

    function deleteRecipe(id){
        setRecipes(recipes.filter(r => r.id !== id))
    }

    const renderRecipe = ({item}) =>{
        return <RecipeListItem navigation={navigation} recipe={item} deleteRecipe={deleteRecipe} listRef={listRef}/>
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
        <SafeAreaView style={{margin:10, alignItems:'center',flex:1}}>
            <CourseMenu activeCourse={course} setCourse={setCourse} />
            <FlatList 
                ref={listRef}
                data={filteredRecipes()}
                renderItem={renderRecipe}
            />
        </SafeAreaView>
    )
}