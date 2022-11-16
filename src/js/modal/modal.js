import { API } from '../utils/api';
import Notiflix from 'notiflix';
import modalMarkup from '../../templates/modal.hbs';
import {LocalStorageAPI, QUEUE_MOVIE_KEY, WATCHED_MOVIE_KEY } from '../utils/local-storage-api'

const getDetails = new API();
const addWatchedMovie = new LocalStorageAPI(WATCHED_MOVIE_KEY);
const addQueueMovie = new LocalStorageAPI(QUEUE_MOVIE_KEY);

const closeModalBtn = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
const modalBodyEl = document.querySelector('.modal__body');


backdropEl.addEventListener('click', onBackdropClick)

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
  if(e.currentTarget === e.target) {
    onCloseModal()
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape'
  if( e.code === ESC_KEY_CODE ) {
     onCloseModal()
  }
}

export async function showMovieDetails(movieId) {
  onOpenModal();
 const movieData = await getDetails.getMovieById(movieId)
 movieData.genres = movieData.genres.map(e=> e.name).join(", ")
 modalBodyEl.innerHTML = modalMarkup(movieData);


//  if(addQueueMovie.getItems().find(el => el.id === movieId)) {

//   modalBtnQueueMovie.disabled = true;
//   Notiflix.Notify.info('This movie has been added')
//  }

//  movieData.find(el =>  )

  const modalBtnWatchedMovie = document.querySelector('.modal__btn-watched');
  const modalBtnQueueMovie = document.querySelector('.modal__btn-queue');

  modalBtnWatchedMovie.addEventListener('click', onAddWatchedMovie);
  modalBtnQueueMovie.addEventListener('click', onAddQueueMovie);


  function onAddWatchedMovie(e) {
    addWatchedMovie.saveObject(movieData)

    if(addWatchedMovie.getItems(movieId)) {
      modalBtnWatchedMovie.disabled = true;
      document.querySelector('.modal__btn-watched').textContent = "Added watched";
      document.querySelector('.modal__btn-watched').style.backgroundColor = " #FF6B01"
      document.querySelector('.modal__btn-watched').style.color = "white"
      document.querySelector('.modal__btn-watched').style.border= "transparent"
     }
  };


  function onAddQueueMovie(e) {
    addQueueMovie.saveObject(movieData)

    if(addQueueMovie.getItems(movieId)) {
      modalBtnQueueMovie.disabled = true;
      document.querySelector('.modal__btn-queue').textContent = "Added to queue"
      document.querySelector('.modal__btn-queue').style.backgroundColor = " #FF6B01"
      document.querySelector('.modal__btn-queue').style.color = "white"
      document.querySelector('.modal__btn-queue').style.border= "transparent"
     }
  }

}
