import * as hesderJS from './js/header/index';
// import { initLoad } from './js/gallery';

import { LocalStorageAPI } from './js/utils/local-storage-api';
import { API } from './js/utils/api';

const WATCHED_MOVIE_KEY = 'wathcedMovieList';
export const QUEUE_MOVIE_KEY = 'queueMovieList';

const watchedMovieStore = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const queueMovieStore = new LocalStorageAPI(QUEUE_MOVIE_KEY);

// initLoad();

// Приклад роботи модалки:

import { showMovieDetails } from './js/modal/modal';

const openModalBtn = document.querySelector('.open-modal');

openModalBtn.addEventListener('click', () => {
  showMovieDetails(505642);
});

// Приклад роботи галереї:

import { renderGallery } from './js/gallery';

const movieApi = new API();

movieApi.getPopularMovies().then(({ results }) => renderGallery(results));
