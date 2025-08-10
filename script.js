const searchfield = document.getElementById('search-field');
const searchbtn = document.getElementById('search-btn');

searchbtn.addEventListener('click', () => {
  const recipe = searchfield.value.trim();
  searchfield.value = "";

  if (recipe === "") {
    alert("Please enter a recipe");
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    .then(response => response.json())
    .then(data => {
      displayRecipes(data.meals, recipe);
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
    });
});

function displayRecipes(recipes, searchTerm) {
  const recipeContainer = document.getElementById('recipe-container');
  recipeContainer.innerHTML = "";

  const oldHeading = document.querySelector('.search-title');
  if (oldHeading) oldHeading.remove();


  const formattedSearch = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
  const searchTitle = document.createElement('h3');
  searchTitle.className = 'search-title';

  if (!recipes || recipes.length === 0) {
    searchTitle.innerHTML = `No recipes found for: "${formattedSearch}"`;
    recipeContainer.prepend(searchTitle);
    return;
  }

  searchTitle.innerHTML = `Search Results for: "${formattedSearch}"`;
  const parent = recipeContainer.parentElement;
  parent.insertBefore(searchTitle, recipeContainer);

  recipes.forEach(item => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
      <img src="${item.strMealThumb}" alt="${item.strMeal}" class="recipe-image">
      <h3 class="recipe-title">${item.strMeal}</h3>
      <a href="recipe.html?id=${item.idMeal}" class="see-more">See More</a>
    `;
    recipeContainer.appendChild(recipeCard);
  });
}
