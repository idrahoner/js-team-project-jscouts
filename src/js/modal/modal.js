import { API } from '../utils/api';
import modalMarkup from '../../templates/modal.hbs';

const getDetails = new API();

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

  console.log(e.currentTarget)
  console.log(e.target)
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape'
  if( e.code === ESC_KEY_CODE ) {
     onCloseModal()
  }
}

export function showMovieDetails(movieId) {
  onOpenModal();
  getDetails.getMovieById(movieId).then(data => {
    data.genres = data.genres.map(e=> e.name).join(", ")
    modalBodyEl.innerHTML = modalMarkup(data);
  });
}
