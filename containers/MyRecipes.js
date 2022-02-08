import React,{useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeListItem from '../components/RecipeListItem'
import CourseMenu from './CourseMenu'

export default function MyRecipes({navigation}){
    const [firstLoad, setFirstLoad] = useState(true)
    const [course,setCourse] = useState('All')
    const [recipes,setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    
    useEffect(()=>{
        loadStorage()
        const loadListener = navigation.addListener('focus',loadStorage)

        return loadListener
    },[])

    useEffect(()=>{
        if(firstLoad) setFirstLoad(false)
        else updateStorage()
    },[recipes])

    const loadStorage = async ()=>{
        try{
            setLoading(true)
            let recipesJSON = await AsyncStorage.getItem("recipes")
            await setRecipes(JSON.parse(recipesJSON))
            setLoading(false)
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

    const deleteRecipe = (id) =>{
        setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== id))
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
            {loading ?
                <ActivityIndicator size={100} color='black'/>
            :
                <FlatList 
                    data={filteredRecipes()}
                    renderItem={renderRecipe}
                />
            }
        </SafeAreaView>
    )
}