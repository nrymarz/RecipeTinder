import axios from 'axios'
import {parse} from 'node-html-parser'
import {v4 as uuidv4} from 'uuid'

let dom = ''
let recipeObj
export default function findRecipe(setRecipe, course, setLoading){
    if(setLoading) setLoading(true)
    const pageNum = Math.floor(Math.random()*500)
    let recipeIndex
    switch(course){
        case 'All':
            recipeIndex = `https://www.foodnetwork.com/search/p/${pageNum}/CUSTOM_FACET:RECIPE_FACET/rating`
            break;
        case 'Entrees':
            recipeIndex = `https://www.foodnetwork.com/search/p/${pageNum}/7D/CUSTOM_FACET:RECIPE_FACET/COURSE_DFACET:0/tag%23meal-part:main-dish/rating`
            break;
        case 'Desserts':
            recipeIndex = `https://www.foodnetwork.com/search/p/${pageNum}/7D/CUSTOM_FACET:RECIPE_FACET/COURSE_DFACET:0/tag%23meal-part:dessert/rating`
            break;
        case 'Sides':
            recipeIndex = `https://www.foodnetwork.com/search/p/${pageNum}/7D/CUSTOM_FACET:RECIPE_FACET/COURSE_DFACET:0/tag%23meal-part:side-dish/rating`
            break;
        case 'Appetizers':
            recipeIndex = `https://www.foodnetwork.com/search/p/${pageNum}/7D/CUSTOM_FACET:RECIPE_FACET/COURSE_DFACET:0/tag%23meal-part:appetizer/rating`
    }

    }
    axios.get(recipeIndex)
        .then(res => dom = parse(res.data))
        .then(() => openRecipe(setRecipe, setLoading))
}

function openRecipe(setRecipe, setLoading){
    const recipes = dom.querySelectorAll('h3 a')
    const num = Math.floor(Math.random()*recipes.length)
    const recipe = recipes[num]
     axios.get("https://" + recipe.attrs.href.slice(2))
         .then(res => recipeObj =  createRecipeObj(parse(res.data)))
         .then(() => setRecipe(recipeObj))
         .then(() =>{ if(setLoading) setLoading(false)})
         
}

function createRecipeObj(recipe){
    const id = uuidv4()
    let title = recipe.querySelector(".o-AssetTitle__a-HeadlineText")
    title = title ? title.innerHTML : "Recipe Title Unavailable"
    let chef = recipe.querySelector(".o-Attribution__a-Name a")
    chef = chef ? chef.innerHTML : "Chef Unkown"
    let ingredients = recipe.querySelectorAll(".o-Ingredients__a-Ingredient .o-Ingredients__a-Ingredient--CheckboxLabel")
    ingredients = ingredients.length>0 ? ingredients.slice(1).map(i => i.innerHTML.trim()) : ["Ingredients Unavailable"]
    let directions = recipe.querySelectorAll(".o-Method__m-Body ol li")
    directions = directions.length>0 ? directions.map(d => d.innerHTML.trim()) : ["Directions Unavailable"]
    const image = "https:" +  recipe.querySelector(".m-MediaBlock__a-Image").attrs.src
    return {
        id,
        title,
        chef,
        ingredients,
        directions,
        image
    }
}