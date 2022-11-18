import { movieApi } from '../utils';
import { onOpenModal, modalBodyEl } from '../modal/modal';

const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

galleryEl.addEventListener('click', handleTrailerBtnClick);
function handleTrailerBtnClick(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  loader.classList.toggle('loader-hidden');
  onOpenModal();
  const galleryItemEl = event.target.closest('.templates-film');
  const movieId = galleryItemEl.dataset.id;
  movieApi
    .getTrailer(movieId)
    .then(key => `https://www.youtube.com/embed/${key}`)
    .then(
      link =>
        (modalBodyEl.innerHTML = ` <iframe class = " video-trailer"
src="${link}"
title="movie trailer"
></iframe>`)
    )
    .catch(console.log)
    .finally(() => loader.classList.toggle('loader-hidden'));
}
