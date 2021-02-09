'use strict';

//Selectors
(() => {

// philip.r.fielding1@gmail.com
// fc6d1b8bca3c4e37b5bab5e6625ac607

// philip.r.fielding@gmail.com
// 880d7c0a61e64e158ba654272cde54b2

const submit = document.getElementById('submitBtn');
const ingredient_api = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=fc6d1b8bca3c4e37b5bab5e6625ac607&ingredients=`;
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
    const recipe = document.getElementById('recipe');

    //functions

    if(recipeList.contains(recipe)) {
        console.log('hit true')
        removeRecipes();
        addRecipes();
    } else {
        console.log('hit false')
        addRecipes();
    }

    function addRecipes() {
            let recipeNo = [0];
            for(let {id,title,image} of data) {

                async function findRecipeInfo() {
                    let recipe_api = `https://api.spoonacular.com/recipes/${id}/information?apiKey=fc6d1b8bca3c4e37b5bab5e6625ac607`

                    let recipe_result = await fetch(recipe_api );
                    let recipe_data = await recipe_result.json();

                        console.log(recipeNo["1"]);

                        let recipesHtml = `<section class = "container-fluid section-${recipeNo.length}"><div class = "container-fluid recipe-container"><div class = "row"><div class = "col-1"></div><div class = "col-10 recipe-title">${title}</div><div class = "col-1"></div></div></div><div class="container-fluid"><div class = "row"><div class = "col-3"></div><div class = "col-6"><div class = "mx-auto recipe-card"><div class = "card-content"><div class = "recipe-card-front recipe-img-1"></div><div class = "recipe-card-back"><div class = "recipe-card-text"><div class = "recipe-time">Prep time:</div><div class = "recipe-mins">${recipe_data.readyInMinutes} mins</div><div class = "recipe-line"></div><div class = "recipe-source">${recipe_data.sourceName}</div><div class = "recipe-steps"><a href = "">Get steps</a></div></div></div></div></div></div><div class = "col-3"></div></div></div> </section></div></div>`;

                        recipeList.innerHTML += recipesHtml;

                        if(recipeNo.length < 5) {
                            recipeNo.push("1");
                        } else {
                            recipeNo.pop();
                            recipeNo.pop();
                            recipeNo.pop();
                            recipeNo.pop();
                            console.log(recipeNo.length);
                        }
            }

            findRecipeInfo();
        }
    }

}

    function removeRecipes() {
        for(let {id,title,image} of data) {
            const recipeList = document.getElementById('recipeList');
            const recipe = document.getElementById('recipe');
            let recipesHtml = `<div id = "recipe"><div>${id}</div><div>${title}</div><div><img src="${image}"></div></div>`;

            if(recipeList.contains(recipe)) {
                recipeList.innerHTML = "";
                recipeList.innerHTML += recipesHtml;
                
            }

        }
    }

function findRecipesOnEnter(e) {
    if(e.keyCode === 13) {
        event.preventDefault();
        findRecipes();
    }
}

})()