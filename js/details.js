import { serachDetailSerie } from "./api.js";
import { addSeriesToFavorite, isSerieFavorited } from "./data.js";

const $ = document.getElementById.bind(document);
const search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get("id");

const star = $("container-star");
let newSerie = {};
const starOn = `<img src="img/yellow_star.png"/>`;
const textError = `<span id="text-error">já foi salva em favoritos</span>`;
const textSucess = `<span id="text-sucess">foi salva em favoritos</span>`;
const errorID = $("mensage-error");
const successID = $("mensage-success");

window.saveSerie = () => {
  if (isSerieFavorited(newSerie)) {
    star.innerHTML = starOn;
    setTimeout(() => {
      errorID.style.display = "block";
      successID.style.display = "none";
      errorID.innerHTML = `${newSerie.name} ${textError} `;
    }, 200);
  } else {
    star.innerHTML = starOn;
    addSeriesToFavorite(newSerie);
    setTimeout(() => {
      successID.style.display = "block";
      successID.innerHTML = `${newSerie.name} ${textSucess}`;
    }, 200);
  }
};

const results = await serachDetailSerie({ id });
const { imageUrl, name, type, language, genres, running, channel } = results;
newSerie = results;
$("poster").src = imageUrl;
$("name").innerText = name;
$("type").innerText = type;
$("language").innerText = language;
$("genres").innerText = genres;
$("running").innerText = running ? "Sim" : "Não";
$("channel").innerText = channel;
$(
  "back-home"
).innerHTML = `<a id="back-link" href="/index.html?name=${name}">Voltar</a>`;
