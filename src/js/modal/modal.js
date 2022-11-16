import { API } from '../utils/api';
import modalMarkup from '../../templates/modal.hbs';
import {
  LocalStorageAPI,
  QUEUE_MOVIE_KEY,
  WATCHED_MOVIE_KEY,
} from '../utils/local-storage-api';

const getDetails = new API();
const addWatchedMovie = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const addQueueMovie = new LocalStorageAPI(QUEUE_MOVIE_KEY);

const closeModalBtn = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
const modalBodyEl = document.querySelector('.modal__body');

backdropEl.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeydown);
  backdropEl.classList.remove('is-hidden');
  closeModalBtn.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeydown);
  backdropEl.classList.add('is-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

export async function showMovieDetails(movieId) {
  onOpenModal();
  const movieData = await getDetails.getMovieById(movieId);
  movieData.genres = movieData.genres.map(e => e.name).join(', ');
  modalBodyEl.innerHTML = modalMarkup(movieData);

  const modalBtnWatchedMovie = document.querySelector('.modal__btn-watched');
  const modalBtnQueueMovie = document.querySelector('.modal__btn-queue');

  modalBtnWatchedMovie.addEventListener('click', onAddWatchedMovie);
  modalBtnQueueMovie.addEventListener('click', onAddQueueMovie);

  function onAddWatchedMovie(e) {
    addWatchedMovie.saveObject(movieData);
  }

  function onAddQueueMovie(e) {
    addQueueMovie.saveObject(movieData);
  }
}
