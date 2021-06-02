import axios from 'axios'
import {parse} from 'node-html-parser'

const link = "https://www.foodnetwork.com/search/p/1/CUSTOM_FACET:RECIPE_FACET"

export default function findRecipe(){
    let dom = ''
    axios.get(link)
        .then(res => dom = parse(res.data))
        .then( () => console.log(dom))
}