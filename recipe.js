const recipeDetailContainer = document.getElementById('recipe-detail');
const randomWrapper = document.getElementById('random-wrapper');

const mealId = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", () => {
  if (mealId) {
    fetchRecipeDetails(mealId);
  } else {
    showRandomRecipes();
  }
});

function showRandomRecipes() {
  recipeDetailContainer.style.display = "none";
  randomWrapper.style.display = "block";
  randomWrapper.innerHTML = "";

  const heading = document.createElement("h3");
  heading.className = "random-recipe-title";
  heading.textContent = "Random Recipes";
  randomWrapper.appendChild(heading);

  const container = document.createElement("div");
  container.id = "random-container";

  for (let i = 0; i < 6; i++) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => {
        const recipe = data.meals[0];
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
          <img src="${recipe.strMealThumb}" class="recipe-image" />
          <h3 class="recipe-title">${recipe.strMeal}</h3>
          <a href="recipe.html?id=${recipe.idMeal}" class="see-more">View</a>
        `;
        container.appendChild(card);
      });
  }

  randomWrapper.appendChild(container);
}

function fetchRecipeDetails(id) {
  fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then(res => res.json())
    .then(data => {
      if (data.meals && data.meals.length > 0) {
        renderRecipeDetail(data.meals[0]);
      }
    });
}

function renderRecipeDetail(recipe) {
  randomWrapper.style.display = "none";
  recipeDetailContainer.style.display = "block";
  recipeDetailContainer.innerHTML = `
    <div class="detail-box">
      <h2 class="detail-title">${recipe.strMeal}</h2>
      <img src="${recipe.strMealThumb}" class="detail-img" />
      <p><strong>Category:</strong> ${recipe.strCategory}</p>
      <p><strong>Area:</strong> ${recipe.strArea}</p>
      <p class="detail-instructions">${recipe.strInstructions}</p>
      ${recipe.strYoutube ? `<a href="${recipe.strYoutube}" target="_blank" class="detail-youtube">Watch on YouTube</a>` : ""}
    </div>
    <div class="show-random-wrapper">
      <button id="show-random-btn">Show Random Recipes</button>
    </div>
  `;

  document.getElementById("show-random-btn").addEventListener("click", () => {
    history.pushState({}, "", "recipe.html");
    showRandomRecipes();
  });
}
