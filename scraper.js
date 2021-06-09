import axios from 'axios'
import {parse} from 'node-html-parser'

const recipeIndex = "https://www.foodnetwork.com/search/p/1/CUSTOM_FACET:RECIPE_FACET"

let dom = ''
let recipeObj
export default function findRecipe(setRecipe){
    axios.get(recipeIndex)
        .then(res => dom = parse(res.data))
        .then(() => openRecipe(setRecipe))
}

function openRecipe(setRecipe){
    const num = Math.floor(Math.random()*10)
    const recipes = dom.querySelectorAll('h3 a')
    const recipe = recipes[num]
     axios.get("https://" + recipe.attrs.href.slice(2))
         .then(res => recipeObj =  createRecipeObj(parse(res.data)))
         .then(() => setRecipe(recipeObj))
}

function createRecipeObj(recipe){
    const title = recipe.querySelector(".o-AssetTitle__a-HeadlineText").innerHTML
    const chef = recipe.querySelector(".o-Attribution__a-Name a").innerHTML
    let ingredients = recipe.querySelectorAll(".o-Ingredients__a-Ingredient .o-Ingredients__a-Ingredient--CheckboxLabel").slice(1)
    ingredients = ingredients.map(i => i.innerHTML.trim())
    let directions = recipe.querySelectorAll(".o-Method__m-Body ol li").slice(0,-1)
    directions = directions.map(d => d.innerHTML.trim())
    return {
        title,
        chef,
        ingredients,
        directions
    }
}