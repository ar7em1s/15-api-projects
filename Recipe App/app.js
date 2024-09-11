let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let listContainer = document.querySelector(".list");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let userInp = document.getElementById("user-input");

function removeElements() {
  listContainer.innerHTML = "";
}

function displayWords(value) {
  userInp.value = value;
  removeElements();
}

function clearInput() {
  userInp.value = "";
}

userInp.addEventListener("keyup", async () => {
  removeElements();
  if (userInp.value.length <= 3) {
    return false;
  }

  const responseRes = await fetch(url + userInp.value);
  const jsonData = await responseRes.json();

  jsonData.meals.forEach((meal) => {
    let mealName = meal.strMeal;
    let mealDiv = document.createElement("div");

    mealDiv.style.cursor = "pointer";
    mealDiv.classList.add("autocomplete");
    mealDiv.setAttribute("onclick", `displayWords("${mealName}")`);

    let word = "<b>" + mealName + "</b>";

    mealDiv.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(mealDiv);
  });
});

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-input").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input field cannot be empty!</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];

        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";

          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count++;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `<div class="image-container"><img src=${myMeal.strMealThumb}></div> <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
      </div>
      <div id="ingredient-container"></div>
      <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>`;

        let ingredientCon = document.getElementById("ingredient-container");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        //creating 'ul' parent and appending all 'li' children, appending the parent to the container
        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });

        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid input. Try again!</h3>`;
      });
    clearInput();
  }
});
