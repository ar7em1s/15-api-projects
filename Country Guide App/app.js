let searchBtn = document.getElementById("search-btn");
let countryInput = document.getElementById("country-input");
searchBtn.addEventListener("click", () => {
  let countryName = countryInput.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      result.innerHTML = `<img src="${data[0].flags.svg}" class="flag-img">
      <h2>${data[0].name.common}</h2>
      <div class="wrapper">
        <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${data[0].capital[0]}</span>
        </div>
      </div>

      <div class="wrapper">
        <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${data[0].continents[0]}</span>
        </div>
      </div>

      <div class="wrapper">
        <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${data[0].population.toLocaleString("en-US")}</span>
        </div>
      </div>

      <div class="wrapper">
        <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${data[0].currencies[Object.keys(data[0].currencies)].name} (${data[0].currencies[Object.keys(data[0].currencies)].symbol})</span>
        </div>
      </div>
    `;
    });
});
