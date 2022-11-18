import Notiflix from 'notiflix';
import { movieApi, watchedMovieStore, queueMovieStore } from '../utils';
import modalMarkup from '../../templates/modal.hbs';

const closeModalBtn = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
export const modalBodyEl = document.querySelector('.modal__body');

backdropEl.addEventListener('click', onBackdropClick);

export function onOpenModal() {
  window.addEventListener('keydown', onEscKeydown);
  backdropEl.classList.remove('is-hidden');
  closeModalBtn.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeydown);
  backdropEl.classList.add('is-hidden');
  modalBodyEl.innerHTML = '';
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

const loader = document.querySelector('.loader');
export async function showMovieDetails(movieId) {
  onOpenModal();
  loader.classList.toggle('loader-hidden');
  const movieData = await movieApi.getMovieById(movieId);
  movieData.genres = movieData.genres.map(e => e.name).join(', ');
  loader.classList.toggle('loader-hidden');
  modalBodyEl.innerHTML = modalMarkup(movieData);

  const modalBtnWatchedMovie = document.querySelector('.modal__btn-watched');
  const modalBtnQueueMovie = document.querySelector('.modal__btn-queue');

  modalBtnWatchedMovie.addEventListener('click', onAddWatchedMovie);
  modalBtnQueueMovie.addEventListener('click', onAddQueueMovie);

  if (watchedMovieStore.findItem(Number(movieId))) {
    modalBtnWatchedMovie.textContent = modalBtnWatchedMovie.classList.contains(
      'modal__btn-watched'
    )
      ? 'Remove from Watched'
      : 'Remove from Queue';
    modalBtnWatchedMovie.classList.add('modal__btn-on');
  }

  if (queueMovieStore.findItem(Number(movieId))) {
    modalBtnQueueMovie.textContent = modalBtnQueueMovie.classList.contains(
      'modal__btn-watched'
    )
      ? 'Remove from Watched'
      : 'Remove from Queue';
    modalBtnQueueMovie.classList.add('modal__btn-on');
  }

  function onAddWatchedMovie(e) {
    prepareButtonContent(watchedMovieStore, modalBtnWatchedMovie, movieData);
  }

  function onAddQueueMovie(e) {
    prepareButtonContent(queueMovieStore, modalBtnQueueMovie, movieData);
  }
}

function prepareButtonContent(localStorage, buttonEl, movieData) {
  if (!localStorage.getItems()) {
    localStorage.saveObject(movieData);
    buttonEl.textContent = buttonEl.classList.contains('modal__btn-watched')
      ? 'Remove from Watched'
      : 'Remove from Queue';
    buttonEl.classList.add('modal__btn-on');
  } else {
    if (!localStorage.findItem(movieData.id)) {
      localStorage.saveObject(movieData);
      buttonEl.textContent = buttonEl.classList.contains('modal__btn-watched')
        ? 'Remove from Watched'
        : 'Remove from Queue';
      buttonEl.classList.add('modal__btn-on');
      Notiflix.Notify.info('The movie has been added to your library');
    } else {
      localStorage.removeItem(movieData.id);
      buttonEl.textContent = buttonEl.classList.contains('modal__btn-watched')
        ? 'Add to Watched'
        : 'Add to Queue';
      buttonEl.classList.remove('modal__btn-on');
      Notiflix.Notify.info('The movie has been removed from your library');
    }
  }
}
