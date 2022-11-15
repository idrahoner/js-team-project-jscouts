import * as hesderJS from './js/header/index';

import { LocalStorageAPI } from './js/utils/local-storage-api';
import { API } from './js/utils/api';

const WATCHED_MOVIE_KEY = 'wathcedMovieList';
export const QUEUE_MOVIE_KEY = 'queueMovieList';

const watchedMovieStore = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const queueMovieStore = new LocalStorageAPI(QUEUE_MOVIE_KEY);

// Приклад роботи галереї:

import { renderGallery } from './js/gallery';

const movieApi = new API();

movieApi.getPopularMovies().then(({ results }) => renderGallery(results));
