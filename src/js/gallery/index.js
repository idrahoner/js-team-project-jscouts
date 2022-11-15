import { API } from '../utils/api';
import card from '../../templates/card.hbs';
import { showMovieDetails } from '../modal/modal';

const galleryEl = document.querySelector('.gallery');
const movieApi = new API();

// export function initLoad() {
//   apiPopular.getPopularMovies().then(({ results }) => {
//     console.log(results);
//     gallery.innerHTML = card(results);
//     apiPopular
//       .getGenreList()
//       .then(genres => {
//         const d = document.querySelectorAll('.templates-film__text');
//         for (let i = 0; i < results.length; i++) {
//           const r = results[i].genre_ids;
//           for (let j = 0; j < genres.length; j++) {
//             if (r.includes(genres[j].id)) {
//               d[i].innerHTML +=
//                 ' ' + genres[j].name + ' <span class="span"> , </span> ';
//             }
//           }
//           const dat = new Date(results[i].release_date);
//           d[i].innerHTML += '| ' + dat.getFullYear();
//         }
//       })
//       .catch(console.log);
//   });
// }

galleryEl.addEventListener('click', onCardClick);

function onCardClick(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  const galleryItemEl = event.target.closest('.templates-film');
  const movieId = galleryItemEl.dataset.id;

  showMovieDetails(movieId);
}

export function renderGallery(array) {
  galleryEl.innerHTML = card(array);
}
