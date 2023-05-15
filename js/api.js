const API_URL = "https://api.tvmazes.com/search/shows?";

export const searchSeries = async ({ q }) => {
  try {
    const response = await fetch(API_URL + new URLSearchParams({ q })).then(
      (response) => response.json()
    );

    return response.map((data) => ({
      name: data.show.name,
      img: data.show.image.medium,
    }));
  } catch (e) {
    return [];
  }
};

// score
// :
// 0.7008786
// show
// :
// averageRuntime
// :
// 30
// dvdCountry
// :
// null
// ended
// :
// "2013-05-16"
// externals
// :
// {tvrage: 6061, thetvdb: 73244, imdb: 'tt0386676'}
// genres
// :
// ['Comedy']
