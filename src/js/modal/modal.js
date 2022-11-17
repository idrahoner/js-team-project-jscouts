import { API } from '../utils/api';
import Notiflix from 'notiflix';
import modalMarkup from '../../templates/modal.hbs';
import {
  LocalStorageAPI,
  QUEUE_MOVIE_KEY,
  WATCHED_MOVIE_KEY,
} from '../utils/local-storage-api';

const getDetails = new API();
const watchedMovieLocalStorage = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const queueMovieLocalStorage = new LocalStorageAPI(QUEUE_MOVIE_KEY);

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

  if (watchedMovieLocalStorage.findItem(Number(movieId))) {
    modalBtnWatchedMovie.textContent = 'Remove from library';
    modalBtnWatchedMovie.classList.add('modal__btn-on');
  }

  if (queueMovieLocalStorage.findItem(Number(movieId))) {
    modalBtnQueueMovie.textContent = 'Remove from library';
    modalBtnQueueMovie.classList.add('modal__btn-on');
  }
}

function onAddWatchedMovie(e) {
  prepareButtonContent(
    watchedMovieLocalStorage,
    modalBtnWatchedMovie,
    movieData
  );
}

function onAddQueueMovie(e) {
  console.log('klick')
  prepareButtonContent(
    queueMovieLocalStorage,
    modalBtnQueueMovie,
    movieData);
}

function prepareButtonContent(localStorage, buttonEl, movieData) {
  if (!localStorage.getItems()) {
    localStorage.saveObject(movieData);
    buttonEl.textContent = 'Remove from library';
    buttonEl.classList.add('modal__btn-on');
  } else {
    if (!localStorage.findItem(movieData.id)) {
      localStorage.saveObject(movieData);
      buttonEl.textContent = 'Remove from library';
      buttonEl.classList.add('modal__btn-on');
      Notiflix.Notify.info('The movie has been added to your library');
    } else {
      localStorage.removeItem(movieData.id);
      buttonEl.textContent = buttonEl.classList.contains('modal__btn-watched')
        ? 'Add to Wached'
        : 'Add to Queue';
      buttonEl.classList.remove('modal__btn-on');
      Notiflix.Notify.info('The movie has been removed from your library');
    }
  }
}

