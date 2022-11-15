import { API } from '../utils/api';
import card from '../../templates/card.hbs';

const gallery = document.querySelector('.gallery');
const apiPopular = new API();

export function initLoad() {
  apiPopular.getPopularMovies().then(({ results }) => {
    console.log(results);
    gallery.innerHTML = card(results);
    apiPopular
      .getGenreList()
      .then(genres => {
        const d = document.querySelectorAll('.templates-film__text');
        for (let i = 0; i < results.length; i++) {
          const r = results[i].genre_ids;
          for (let j = 0; j < genres.length; j++) {
            if (r.includes(genres[j].id)) {
              d[i].innerHTML +=
                ' ' + genres[j].name + ' <span class="span"> , </span> ';
            }
          }
          const dat = new Date(results[i].release_date);
          d[i].innerHTML += '| ' + dat.getFullYear();
        }
      })
      .catch(console.log);
  });
}
