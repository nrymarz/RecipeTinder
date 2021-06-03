import axios from 'axios'
import {parse} from 'node-html-parser'

const recipeIndex = "https://www.foodnetwork.com/search/p/1/CUSTOM_FACET:RECIPE_FACET"

let dom = ''

export default function findRecipe(){
    axios.get(recipeIndex)
        .then(res => dom = parse(res.data))
        .then(openRecipe)
}

function openRecipe(){
    const recipe = dom.querySelector('h3 a')
     axios.get(recipe.attrs.href)
         .then(res => createRecipeObj(parse(res.data)))
}

function createRecipeObj(recipe){
    console.log(recipe)
}