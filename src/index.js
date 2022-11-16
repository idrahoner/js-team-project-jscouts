import * as hesderJS from './js/header/index';
import * as darkmode from './js/darkmode/darkmode';
import { LocalStorageAPI } from './js/utils/local-storage-api';
import { API } from './js/utils/api';
import './js/pagination/pagination';
const WATCHED_MOVIE_KEY = 'wathcedMovieList';
export const QUEUE_MOVIE_KEY = 'queueMovieList';

const watchedMovieStore = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const queueMovieStore = new LocalStorageAPI(QUEUE_MOVIE_KEY);

// Приклад роботи галереї:

import { renderGallery } from './js/gallery';
import { showGallery } from './js/pagination/pagination';

const movieApi = new API();

movieApi.getPopularMovies().then(data => showGallery(data));

// Робота з пагінацією:
