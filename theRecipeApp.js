'use strict';

//Selectors

const submit = document.getElementById('submitBtn');
const api = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=fc6d1b8bca3c4e37b5bab5e6625ac607&ingredients=`;

//Event Listeners

submit.addEventListener('click',findRecipes);

//Functions

async function findRecipes() {
    const input = document.getElementById('inputField').value;
    const api_url = api + input;
    const result = await fetch(api_url);
    const data = await result.json();

    for(let {id,title,image} of data) {
        let recipesHtml = `<div>${id}</div>
        <div>${title}</div>
        <div><img src="${image}"></div>`;

        console.log(id,title,image);

        const recipeDiv = document.getElementById('recipes');

        recipeDiv.innerHTML = recipesHtml;
    }

    // const nutritionInfoUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=fc6d1b8bca3c4e37b5bab5e6625ac607&includeNutrition=false`

    // const nutritionResult = await fetch(nutritionInfoUrl);
    // const nutritionData = await nutritionResult.json();

    // console.log(nutritionData.title);

}

// https://api.spoonacular.com/recipes/716429/information?apiKey=fc6d1b8bca3c4e37b5bab5e6625ac607&includeNutrition=false