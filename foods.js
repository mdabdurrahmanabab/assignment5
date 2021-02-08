
const searchBtn=document.getElementById("search-btn");
const mealList=document.getElementById("meal");
const mealDetailsContent=document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", removeModal);

function getMealList(){
    let searchInputText=document.getElementById("search-input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response=> response.json())
    .then(data=>{
        let html='';
        if(searchInputText.length==0){
            html="Search egg , beef , onion ";
        }else if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Buy food</a>
                    </div>
                </div>
                `;
            });
        }else{
            html="Search egg , beef , onion";
        }
        mealList.innerHTML=html;
    });
}
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=>response.json())
        .then(data=>mealRecipeModal(data.meals))
    }
}
function mealRecipeModal(meal){
    meal=meal[0];
    let html=`
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <ul class="show-item">
            <li>01 ${meal.strIngredient1}</li>
            <li>02 ${meal.strIngredient2}</li>
            <li>03 ${meal.strIngredient3}</li>
            <li>04 ${meal.strIngredient4}</li>
            <li>05 ${meal.strIngredient5}</li>
            <li>06 ${meal.strIngredient6}</li>
        </ul>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
function removeModal(){
    mealDetailsContent.parentElement.classList.remove('showRecipe');
}