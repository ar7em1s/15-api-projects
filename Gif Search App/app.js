import { apiKey } from "./giphyApiKey.js";

let submit = document.getElementById("submit-btn");

let generateGif = () => {
  //display loader animation until gifs load
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";

  //get the search value ('laugh' is default)
  let q = document.getElementById("search-box").value;

  //results
  let gifCount = 10;
  let finalUrl = `https://www.api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}`;
};

submit.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);
