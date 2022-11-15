import axios from 'axios';

export class API {
  #key;
  #url;

  constructor() {
    this.#url = 'https://api.themoviedb.org/3';
    this.#key = '4482c6f70dd5d76d520552b0779b25da';
    this.page = 1;
    this.query = '';
  }

  getPopularMovies() {
    return axios(
      `${this.#url}/discover/movie?sort_by=popularity.desc&api_key=${
        this.#key
      }&page=${this.page}`
    ).then(({ data }) => data);
  }

  getMovieById(id) {
    return axios(`${this.#url}/movie/${id}?api_key=${this.#key}`).then(
      ({ data }) => data
    );
  }

  searchMovie() {
    return axios(
      `${this.#url}/search/multi?api_key=${this.#key}&query=${
        this.query
      }&page=${this.page}`
    ).then(({ data }) => data);
  }

  getGanreList() {
    return axios(`${this.#url}/genre/movie/list?api_key=${this.#key}`).then(({data}) => data.genres);
  }

  icnreasePage() {
    this.page += 1;
  }

  decreasePage() {
    this.page -= 1;
  }

  setPage(number) {
    this.page = number;
  }

  resetPage() {
    this.page = 1;
  }

  setQuery(query) {
    this.query = query;
  }

  resetQuery() {
    this.query = '';
  }
}