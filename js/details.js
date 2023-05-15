const $ = document.getElementById.bind(document);

const API_URL = "https://api.tvmaze.com/shows";

const search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get("id");
const star = $("container-star");
let flagStar = false;
let favoriteSeries = [];
let newSerie = {};

const teste = () => {
  flagStar ? (flagStar = false) : (flagStar = true);

  if (flagStar) {
    star.innerHTML = `<img src="img/yellow_star.png"/>`;

    const storedSeries = localStorage.getItem("favorite_series");
    if (storedSeries) {
      favoriteSeries = JSON.parse(storedSeries);
    }

    const seriesExists = favoriteSeries.some(
      (serie) => serie.id === newSerie.id
    );
    if (!seriesExists) {
      favoriteSeries.push(newSerie);
      localStorage.setItem("favorite_series", JSON.stringify(favoriteSeries));
      setTimeout(() => {
        $("mensage-success").style.display = "block";
        $(
          "mensage-success"
        ).innerHTML = `${newSerie.name} <span id="text-sucess">foi salva em favoritos</span>`;
      }, 200);
      $("mensage-success").style.display = "none";
    } else {
      star.innerHTML = `<img src="img/yellow_star.png"/>`;
      setTimeout(() => {
        $("mensage-error").style.display = "block";
        $(
          "mensage-error"
        ).innerHTML = `${newSerie.name} <span id="text-error">já foi salva em favoritos</span>`;
      }, 200);
    }
  }
};

fetch(`${API_URL}/${id}`).then((response) => {
  response.json().then((result) => {
    const { name, type, language, genres, status, image, network, webChannel } =
      result;

    const running = status === "Ended" ? false : true;
    const imageUrl = image ? image.medium : "/img/noimage.png";
    const channel = network ? network.name : webChannel.name;

    $("poster").src = imageUrl;
    $("name").innerText = name;
    $("type").innerText = type;
    $("language").innerText = language;
    $("genres").innerText = genres.join(", ");
    $("running").innerText = running ? "Sim" : "Não";
    $("channel").innerText = channel;
    $(
      "back-home"
    ).innerHTML = `<a id="back-link" href="/index.html?name=${name}">Voltar</a>`;

    const dataSerie = {
      imageUrl,
      name,
      type,
      language,
      genres,
      running,
      channel,
      id,
    };

    newSerie = dataSerie;
  });
});
