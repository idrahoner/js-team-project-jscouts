import { API } from '../utils/api';
import modalMarkup from '../../templates/modal.hbs';

const getDetails = new API();

const closeModalBtn = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
const modalBodyEl = document.querySelector('.modal__body');

function onOpenModal() {
  backdropEl.classList.remove('is-hidden');
  closeModalBtn.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  backdropEl.classList.add('is-hidden');
}

export function showMovieDetails(movieId) {
  onOpenModal();
  getDetails.getMovieById(movieId).then(data => {
    modalBodyEl.innerHTML = modalMarkup(data);
  });
}
