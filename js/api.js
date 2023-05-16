const API_URL = "https://api.tvmaze.com/search/shows?";
const API_URL_DETAILS = "https://api.tvmaze.com/shows";

export const searchSeries = async ({ q }) => {
  try {
    const response = await fetch(API_URL + new URLSearchParams({ q })).then(
      (response) => response.json()
    );

    return response.map((data) => ({
      id: data.show.id,
      name: data.show.name,
      imageUrl: data.show.image?.medium || "/img/noimage.png",
    }));
  } catch (e) {
    return [];
  }
};

export const serachDetailSerie = async ({ id }) => {
  console.log({ aaa: id });
  try {
    const data = await fetch(`${API_URL_DETAILS}/${id}`).then((response) =>
      response.json()
    );

    return {
      id: data.id,
      name: data.name,
      type: data.type,
      language: data.language,
      genres: data.genres.join(", "),
      status: data.status,
      image: data.image.medium,
      network: data.network.name,
      webChannel: data.webChannel,
      running: data.status === "Ended" ? false : true,
      imageUrl: data.image ? data.image.medium : "/img/noimage.png",
      channel: data.network ? data.network.name : data.webChannel,
    };
  } catch (e) {
    console.error(e);
    return [];
  }
};
