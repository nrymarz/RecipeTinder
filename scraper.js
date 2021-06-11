import axios from 'axios'
import {parse} from 'node-html-parser'

const recipeIndex = "https://www.foodnetwork.com/search/p/1/CUSTOM_FACET:RECIPE_FACET"

let dom = ''
let recipeObj
export default function findRecipe(setRecipe, setLoading){
    axios.get(recipeIndex)
        .then(res => dom = parse(res.data))
        .then(() => openRecipe(setRecipe, setLoading))
}

function openRecipe(setRecipe, setLoading){
    const num = Math.floor(Math.random()*10)
    console.log(num)
    const recipes = dom.querySelectorAll('h3 a')
    const recipe = recipes[num]
     axios.get("https://" + recipe.attrs.href.slice(2))
         .then(res => recipeObj =  createRecipeObj(parse(res.data)))
         .then(() => setRecipe(recipeObj))
         .then(() => setLoading(false))
         
}

function createRecipeObj(recipe){
    let title = recipe.querySelector(".o-AssetTitle__a-HeadlineText")
    title = title ? title.innerHTML : "Recipe Title Unavailable"
    let chef = recipe.querySelector(".o-Attribution__a-Name a")
    chef = chef ? chef.innerHTML : "Chef Unkown"
    let ingredients = recipe.querySelectorAll(".o-Ingredients__a-Ingredient .o-Ingredients__a-Ingredient--CheckboxLabel")
    ingredients = ingredients ? ingredients.slice(1).map(i => i.innerHTML.trim()) : ["Ingredients Unavailable"]
    let directions = recipe.querySelectorAll(".o-Method__m-Body ol li")
    directions = directions ? directions.slice(0,-1).map(d => d.innerHTML.trim()) : ["Directions Unavailable"]
    return {
        title,
        chef,
        ingredients,
        directions
    }
}