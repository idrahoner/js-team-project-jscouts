import * as hesderJS from './js/header/index';
import { initLoad } from './js/gallery';

import { LocalStorageAPI } from './js/utils/local-storage-api';

const WATCHED_MOVIE_KEY = 'wathcedMovieList';
const QUEUE_MOVIE_KEY = 'queueMovieList';

const watchedMovieStore = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const queueMovieStore = new LocalStorageAPI(QUEUE_MOVIE_KEY);

initLoad();
