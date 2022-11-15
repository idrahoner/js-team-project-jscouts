// import './sass/modal.scss';
import { API } from '../utils/api';
import createModalCard from '../../templates/modal.hbs';

const modalEl = document.querySelector('.backdrop')
const galleryEl = document.querySelector('.gallery');


galleryEl.addEventListener('click',handleGalerryClick)


function handleGalerryClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  console.log(e.target.id)
  modalEl.classList.remove('is-hidden')
  const api = new API();
  api.getMovieById(e.target.id)
  .then((data) => {
   console.log(data)

   modalEl.innerHTML = createModalCard(data)
  })

}







