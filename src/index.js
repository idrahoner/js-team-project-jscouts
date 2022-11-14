import { API } from './js/utils/api';
const api = new API();
api.getPopularMovies().then(console.log).catch(console.log);
api.getMovieById('801071').then(console.log).catch(console.log);

api.setQuery('jack');
api.searchMovie().then(console.log).catch(console.log);

api.icnreasePage();

api.searchMovie().then(console.log);
