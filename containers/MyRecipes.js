import React,{useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeListItem from '../components/RecipeListItem'
import CourseMenu from './CourseMenu'

export default function MyRecipes({navigation}){
    const [course,setCourse] = useState('All')
    const [recipes,setRecipes] = useState([])

    useEffect( async ()=>{
        loadStorage
        const loadListener = navigation.addListener('focus',loadStorage)

        return loadListener
    },[])

    const loadStorage = async ()=>{
        try{
            let recipes = await AsyncStorage.getItem("recipes")
            setRecipes(JSON.parse(recipes))
        } catch(e){
            alert(e)
        }
    }

    const updateStorage = async () =>{
        try{
            await AsyncStorage.setItem("recipes",JSON.stringify(recipes))
        }
        catch(e){
            alert(e)
        }
    }

    async function deleteRecipe(id){
        await setRecipes(recipes.filter(r => r.id !== id))
        updateStorage()
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
        <SafeAreaView style={{margin:10, alignItems:'center',flex:1}}>
            <CourseMenu activeCourse={course} setCourse={setCourse} />
            <FlatList 
                data={filteredRecipes()}
                renderItem={renderRecipe}
            />
        </SafeAreaView>
    )
}