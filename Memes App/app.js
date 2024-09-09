// will be updated gradually since there is daily API call limit
import { apiKey, apiUrl } from "./apiInfo.js"; //API key and API url

let meme = document.getElementById("meme");
let getMemeBTN = document.getElementById("get-meme-btn");

let getMeme = () => {
  fetch(apiUrl + apiKey)
    .then((data) => data.json())
    .then((item) => {
      let memeUrl = item.preview?.images[0]?.source?.url || item.url; // checks for preview
      let memeImg = new Image();

      memeImg.onload = () => {
        meme.src = memeUrl;
      };

      memeUrl = memeUrl.replace(/&amp;/g, "&"); // fix potential URL encoding issues
      memeImg.src = memeUrl;
    })
    .catch((err) => console.error("Error fetching the meme:", err));
};

getMemeBTN.addEventListener("click", getMeme);
window.addEventListener("load", getMeme);
