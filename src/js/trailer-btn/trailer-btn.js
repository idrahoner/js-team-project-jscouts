import axios from 'axios';

export const galleryEl = document.querySelector('.gallery');
export const trailerBtn = document.querySelector('[data-modal-close]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
const modalBodyEl = document.querySelector('.modal__body');

galleryEl.addEventListener('click', handleTrailerBtnClick);
export function handleTrailerBtnClick(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  onOpenModal();
  const galleryItemEl = event.target.closest('.templates-film');
  const movieId = galleryItemEl.dataset.id;
  console.log(movieId);
  axios(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4482c6f70dd5d76d520552b0779b25da`
  )
    .then(({ data }) => data.results[0].key)
    .then(key => `https://www.youtube.com/embed/${key}`)
    .then(
      link =>
        (modalBodyEl.innerHTML = ` <iframe class = " video-trailer"  
src="${link}" 
title="movie trailer"
></iframe>`)
    )
    .catch(console.log);
}

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