//declaring variables 
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = ' ';
const App_id = 'c977b39a';
const App_key = 'ccea704e20de67cbef4cc067c41e1227';      //API ID AND API KEY for fetching api
//Main logic
//functions

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${App_id}&app_key=${App_key}&to=20`;  //using backtikes here for dynamically declaration
    const response = await fetch(baseUrl);
    const data = await response.json();
     generateHTML(data.hits);
    // console.log(data);
}


//creating or updating html items by API fatching
function generateHTML(result){
    let updatedHTML = '';
    result.map(result =>{
        updatedHTML +=
        `
        <div class="items" >
                    <img src="${result.recipe.image}" alt="recipe-image">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a  class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                    </div>
                    <p class="item-data"><b>Calories</b>: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data"><b>Diet Label</b>: ${result.recipe.dietLabels.length > 0 ?result.recipe.dietLabels : 'No Data Available'}</p>
                     <p class="item-data"><b>Health Label</b>: ${result.recipe.healthLabels}</p>
                </div>`
    })

    searchResultDiv.innerHTML = updatedHTML;
}