import axios from 'axios';

// const rootEl = document.querySelector('.root');

// axios(
//   'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4482c6f70dd5d76d520552b0779b25da'
// ).then(
//   response =>
//     (rootEl.innerHTML = `
// <img src="https://image.tmdb.org/t/p/original${response.data.results[0].poster_path}" />
// `)
// );

// api_key=4482c6f70dd5d76d520552b0779b25da

export class API {
  #key;
  #url;

  constructor() {
    this.#url = 'https://api.themoviedb.org/3';
    this.#key = '4482c6f70dd5d76d520552b0779b25da';
  }

  getPopularMovies() {
    return axios(
      `${this.#url}/discover/movie?sort_by=popularity.desc&api_key=${this.#key}`
    ).then(({ data }) => data);
  }

  searchMovie(query) {
    return axios(
      `${this.#url}/search/movie?api_key=${this.#key}&query=${query}`
    ).then(({ data }) => data);
  }
}
