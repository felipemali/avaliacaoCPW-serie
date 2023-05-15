export const getLastQuery = () => {
  const last_serie = localStorage.getItem("last_search")
    ? JSON.parse(localStorage.getItem("last_search"))
    : [];

  return last_serie;
};

export const setLastSeries = (series) => {
  localStorage.setItem("last_search", JSON.stringify(series));
};
