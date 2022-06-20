const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3`;
const discoverEndpoint = '/discover/tv';
const searchEndpoint = '/search/tv';
const detailsEndpoint = '/tv';

const getShowsByProviderId = async (id) => {
  const request = await fetch(
    BASE_URL +
      discoverEndpoint +
      `?api_key=${`02f5d3847dfcb55ed317924dc9b17d62`}&language=en-US&sort_by=popularity.desc&with_watch_providers=${id}&watch_region=CA`
  );
  const response = await request.json();
  const shows = await response.results;
  return shows;
};

export const getShowsByAllProviders = (providers) => {
  const responses = [];
  Object.keys(providers).forEach((provider) => {
    responses.push(
      getShowsByProviderId(providers[provider].id).then((shows) => [
        providers[provider].displayName,
        shows,
      ])
    );
  });
  return Promise.all(responses);
};

export const searchShows = async (query) => {
  const URL =
    BASE_URL +
    searchEndpoint +
    `?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`;
  const request = await fetch(URL);
  const response = await request.json();
  const shows = await response.results;
  return shows;
};

export const getShowDetails = async (id) => {
  const URL =
    BASE_URL + detailsEndpoint + `/${id}?api_key=${API_KEY}&language=en-US`;
  const request = await fetch(URL);
  const response = await request.json();
  const details = response;
  return details;
};
