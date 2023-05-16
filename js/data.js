export const getLastSeries = () => {
  const last_serie = localStorage.getItem("last_series")
    ? JSON.parse(localStorage.getItem("last_series"))
    : [];
  return last_serie;
};

export const setLastSeries = (series) => {
  localStorage.setItem("last_series", JSON.stringify(series));
};

export const getLastSearch = () => {
  const last_search = localStorage.getItem("last_search")
    ? JSON.parse(localStorage.getItem("last_search"))
    : "";

  return last_search;
};

export const setLastSearch = (search)=>{
  localStorage.setItem("last_search", JSON.stringify(search));
}
export const getSeriesFavorite = (serieId) => {
  const storedSeries = localStorage.getItem("favorite_series")
    ? JSON.parse(localStorage.getItem("favorite_series"))
    : [];

  const exclued = storedSeries.filter(
    (serie) => parseInt(serie.id) !== parseInt(serieId)
  );

  localStorage.setItem("favorite_series", JSON.stringify(exclued));

  return storedSeries;
};

export const addSeriesToFavorite = (serie) => {
  const storedSeries = getSeriesFavorite();
  console.log(serie);
  if (isSerieFavorited(serie)) {
    return;
  }

  storedSeries.push(serie);
  localStorage.setItem("favorite_series", JSON.stringify(storedSeries));
};

export const isSerieFavorited = (serie) => {
  return getSeriesFavorite().some(({ id }) => serie.id === id);
};
