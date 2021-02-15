'use strict';

//Selectors
(() => {

const submit = document.getElementById('submitBtn');
const ingredient_api = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=880d7c0a61e64e158ba654272cde54b2&ingredients=`;
const inputField = document.getElementById('inputField');

//Event Listeners

submit.addEventListener('click',findRecipes);
inputField.addEventListener('keydown', findRecipesOnEnter);

//Functions

async function findRecipes() {
    //selectors

    
    const input = document.getElementById('inputField').value;
    const api_url = ingredient_api + input;
    const result = await fetch(api_url);
    const data = await result.json();
    const recipeList = document.getElementById('recipeList');
    const list = document.getElementById('list');

    //functions

    // 1) Check if the there has already been a search

    if(recipeList.contains(list)) {
        // If true, remove the list add recipes
        removeRecipes();
        addRecipes();
    } else {
        // If false, add the recipes from the API
        addRecipes();
    }

    function addRecipes() {

        // Arrays keep track of what recipe & img the API is on

            let recipeNo = [0];
            let recipeImg = [0];

        // Adds the 

            for(let {id,title,image} of data) {

                async function findRecipeInfo() {
                    let recipe_api = `https://api.spoonacular.com/recipes/${id}/information?apiKey=880d7c0a61e64e158ba654272cde54b2`

                    let recipe_result = await fetch(recipe_api);
                    let recipe_data = await recipe_result.json();

                        console.log(recipeNo["1"]);

                        let recipesHtml = 
                        
                        `<section class = "container-fluid section-${recipeNo.length}" id = "list">
                            <div class = "container-fluid recipe-container">
                                <div class = "row">
                                    <div class = "col-1">
                                        </div><div class = "col-10 recipe-title">${title}</div>
                                        <div class = "col-1"></div><div class="container-fluid">
                                        <div class = "row"><div class = "col-3"></div><div class = "col-6"><div class = "mx-auto recipe-card"><div class = "card-content"><div class = "recipe-card-front" id = "recipe-img-${recipeImg.length}"></div><div class = "recipe-card-back"><div class = "recipe-card-text"><div class = "recipe-time">Prep time:</div><div class = "recipe-mins">${recipe_data.readyInMinutes} mins</div><div class = "recipe-line"></div><div class = "recipe-source">${recipe_data.sourceName}</div><div class = "recipe-steps"><a href = "${recipe_data.sourceUrl}">Get steps</a></div></div></div></div></div></div><div class = "col-3"></div></div></div> </section></div></div>`;

                        recipeList.innerHTML += recipesHtml;

                        let recipeImgNo = `recipe-img-${recipeImg.length}`;

                        document.getElementById(recipeImgNo).style.backgroundImage = `url(${image})`;

                        if(recipeImg.length < 10) {
                            recipeImg.push("1");
                        } else {
                            recipeImg.splice(1,9);       
                        }

                        if(recipeNo.length < 5) {
                            recipeNo.push("1");
                        } else {
                            recipeNo.splice(0,4)
                        }
            }

            findRecipeInfo();
        }
    }

}

    function removeRecipes() {
            const recipeList = document.getElementById('recipeList');
                recipeList.innerHTML = "";
    }

function findRecipesOnEnter(e) {
    if(e.keyCode === 13) {
        event.preventDefault();
        findRecipes();
    }
}

})()