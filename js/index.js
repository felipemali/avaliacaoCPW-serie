import { searchSeries } from "./api.js";
import {
  getLastSearch,
  getLastSeries,
  setLastSearch,
  setLastSeries,
} from "./data.js";

const $ = document.getElementById.bind(document);
const imgLoading = `<img src="/img/loading.gif" alt="Procurando...">`;

window.searchShows = async (event) => {
  event.preventDefault();

  const query = $("query").value;
  setLastSearch(query);
  if (query.trim()) {
    $("not-found-message").style.display = "none";

    const loadingAnimation = imgLoading;
    $("shows-area").innerHTML = loadingAnimation;

    const results = await searchSeries({ q: query });
    setLastSeries(results);

    $("shows-area").innerHTML = "";

    if (results.length === 0) {
      console.log("Nenhum resultado");
      $("not-found-message").style.display = "block";
      return;
    }
    results.forEach((serie) => printCard(serie));
  }
};

const printCard = (show) => {
  const posterId = `poster-${show.id}`;
  const titleId = `title-${show.id}`;
  const cardId = `card-${show.id}`;

  const showCard = `
        <div id="${cardId}" class="show-card">
          <a href="/details.html?id=${show.id}">
            <img id="${posterId}" src="${show.imageUrl}" alt="${show.name}">
          </a>

          <a  href="/details.html?id=${show.id}">
            <h3 id="${titleId}">${show.name}</h3>
          </a>
        </div>
    `;

  const showsArea = $("shows-area");
  showsArea.insertAdjacentHTML("beforeend", showCard);
};

getLastSeries().forEach((serie) => printCard(serie));
$("query").value = getLastSearch();
