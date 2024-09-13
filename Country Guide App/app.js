let searchBtn = document.getElementById("search-btn");
let countryInput = document.getElementById("country-input");
searchBtn.addEventListener("click", () => {
  let countryName = countryInput.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
