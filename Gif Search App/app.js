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
  let gifCount = 12;
  let finalUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";

  fetch(finalUrl)
    .then((resp) => resp.json())
    .then((info) => {
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        //generate cards for each gif
        let container = document.createElement("div");
        container.classList.add("card-container");
        let frame = document.createElement("img");

        frame.setAttribute("src", gif.images.downsized_medium.url);
        frame.onload = () => {
          gifCount--; //when the gif loads successfully  reduce the cound when each gif loads
          if (gifCount == 0) {
            loader.style.display = "none"; //when all gif load successfully hide the loader
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(frame);

        let copyBtn = document.createElement("button"); //creating copy button
        copyBtn.innerText = "Copy link";
        copyBtn.onclick = () => {
          let copyLink = `https://media4.giphy.com/meadia/${gif.id}/giphy.mp4`;
          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              //copy text in the text field
              alert("GIF copied to clipboard");
            })
            .catch(() => {
              //if navigator is not supported
              alert("GIF copied to clipboardF");

              //temp input
              let hiddenInput = document.createAttribute("input");
              hiddenInput.setAttribute("type", "text");
              document.body.appendChild(hiddenInput);
              hiddenInput.value = copyLink;

              //select input
              hiddenInput.select();

              //copy value
              document.execCommand("copy");

              //remove input
              document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
      });
    });
};

submit.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);
