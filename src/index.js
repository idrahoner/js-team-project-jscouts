import * as hesderJS from './js/header/index';
import * as darkmode from './js/darkmode/darkmode';
import * as scrollToTop from './js/scroll-to-top/scroll-to-top';
import * as trailerBtnFeature from './js/trailer-btn/trailer-btn';
import { LocalStorageAPI } from './js/utils/local-storage-api';
import { API } from './js/utils/api';
import './js/pagination/pagination';
import * as footer from './js/modal/modal-footer';
const WATCHED_MOVIE_KEY = 'wathcedMovieList';
export const QUEUE_MOVIE_KEY = 'queueMovieList';

const watchedMovieStore = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const queueMovieStore = new LocalStorageAPI(QUEUE_MOVIE_KEY);

// Приклад роботи галереї:

import { renderGallery } from './js/gallery';
import { showGallery } from './js/pagination/pagination';

const movieApi = new API();
const loader = document.querySelector('.loader');

(() => {
  movieApi
    .getPopularMovies()
    .then(data => showGallery(data))
    .catch(console.log)
    .finally(() => loader.classList.toggle('loader-hidden'));
})();

// Робота з пагінацією:
