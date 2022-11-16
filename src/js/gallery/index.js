import { API } from '../utils/api';
import card from '../../templates/card.hbs';
import { showMovieDetails } from '../modal/modal';
import cardForLibrary from '../../templates/card-for-library.hbs';

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

export async function renderGallery(array) {
  await prepareToRender(array);

  galleryEl.innerHTML = card(array);
  console.log('array: ', array);
}

function nameGenres(id, genresArray) {
  for (let genre of genresArray) {
    if (genre.id === id) {
      return genre.name;
    }
  }
}

async function prepareToRender(array) {
  const genresArray = await movieApi.getGenreList();
  for (let movie of array) {
    for (let i = 0; i < movie.genre_ids.length; i += 1) {
      movie.genre_ids[i] = nameGenres(movie.genre_ids[i], genresArray);
    }
    movie.genre_ids = movie.genre_ids.join(', ');
    const releaseDade = movie.release_date.split('-');
    movie.release_date = releaseDade[0];
  }
}

export function renderLibraryGallery(array) {
  galleryEl.innerHTML = cardForLibrary(array);
}
