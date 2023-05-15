let series = localStorage.getItem("favorite_series")
  ? JSON.parse(localStorage.getItem("favorite_series"))
  : [];
const $ = document.getElementById.bind(document);
let flagExclued = false;

const excludeSerie = (serieId) => {
  series = series.filter((serie) => parseInt(serie.id) !== parseInt(serieId));
  localStorage.setItem("favorite_series", JSON.stringify(series));
  refreshSeries();
  removeCardFromPage(serieId);
};

const printCard = (serie) => {
  const posterId = `poster-${serie.id}`;
  const titleId = `title-${serie.id}`;
  const cardId = `card-${serie.id}`;

  const showCard = `
    <div id="${cardId}" class="show-card">
      <a href="/details.html?id=${serie.id}">
        <img id="${posterId}" src="${serie.imageUrl}" alt="${serie.name}">
      </a>

      <a href="/details.html?id=${serie.id}">
        <h3 id="${titleId}">${serie.name}</h3>
      </a>
      <img onclick="excludeSerie(${serie.id})" class="starr" src="img/yellow_star.png" />
    </div>
  `;

  const showsArea = $("shows-area-favorites");
  showsArea.insertAdjacentHTML("beforeend", showCard);
};

const refreshSeries = () => {
  const showsArea = $("shows-area-favorites");
  showsArea.innerHTML = "";

  series.forEach((serie) => {
    printCard(serie);
  });
};

const removeCardFromPage = (serieId) => {
  const cardId = `card-${serieId}`;
  const card = $(cardId);
  if (card) {
    card.remove();
  }
};

refreshSeries();
