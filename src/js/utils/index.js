import { LocalStorageAPI } from './local-storage-api';
import { API } from './api';

const WATCHED_MOVIE_KEY = 'wathcedMovieList';
const QUEUE_MOVIE_KEY = 'queueMovieList';

export const watchedMovieStore = new LocalStorageAPI(WATCHED_MOVIE_KEY);
export const queueMovieStore = new LocalStorageAPI(QUEUE_MOVIE_KEY);

export const movieApi = new API();
