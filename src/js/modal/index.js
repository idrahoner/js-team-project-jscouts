// import './sass/modal.scss';
import { API } from '../utils/api';
import createModalCard from '../../templates/modal.hbs';

const modalEl = document.querySelector('.modal');


const api = new API();

api.getMovieById(505642)
.then((data) => {
 console.log(data)

 modalEl.innerHTML = createModalCard(data)
})
