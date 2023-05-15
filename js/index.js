import { searchSeries } from "./api.js";

const API_URL = "https://api.tvmaze.com/search/shows?";
const $ = document.getElementById.bind(document);
const last_serie = localStorage.getItem("last_search")
  ? JSON.parse(localStorage.getItem("last_search"))
  : [];

let local = [];

const teste = async () => {
  console.log({ kkkkkl: await searchSeries({ q: "office" }) });
};

const searchShows = (event) => {
  event.preventDefault();
  localStorage.setItem("last_search", "[]");
  local = [];
  const query = $("query").value;

  if (query.trim()) {
    $("not-found-message").style.display = "none";

    const loadingAnimation = `
        <img src="/img/loading.gif" alt="Procurando...">
    `;
    $("shows-area").innerHTML = loadingAnimation;

    fetch(API_URL + new URLSearchParams({ q: query })).then((response) =>
      // Converte a resposta do serviço para JSON
      response.json().then((results) => {
        $("shows-area").innerHTML = "";

        if (results.length === 0) {
          console.log("Nenhum resultado");
          $("not-found-message").style.display = "block";
          return;
        }

        // Laço de repetição para tratar cada um dos shows
        results.forEach((r) => {
          //const show = r.show
          const { show } = r;
          const { id, name, image } = show;

          const imageUrl = image ? image.medium : "/img/noimage.png";

          const newShow = {
            id,
            name,
            imageUrl,
          };
          local.push(newShow);

          printCard(newShow);
        });
        const serieJson = JSON.stringify(local);
        localStorage.setItem("last_search", serieJson);
      })
    );
  }
};

const printCard = (show) => {
  const posterId = `poster-${show.id}`;
  const titleId = `title-${show.id}`;

  const showCard = `
        <div class="show-card">
          <a onclick="teste()" href="/details.html?id=${show.id}">
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
last_serie.forEach((serie) => printCard(serie));
