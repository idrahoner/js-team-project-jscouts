import * as hesderJS from './js/header/index';
import * as darkmode from './js/darkmode/darkmode';
import * as scrollToTop from './js/scroll-to-top/scroll-to-top';
import * as trailerBtnFeature from './js/trailer-btn/trailer-btn';
import { movieApi } from './js/utils';
import './js/pagination/pagination';
import * as footer from './js/modal/modal-footer';

import { showGallery } from './js/gallery';

const loader = document.querySelector('.loader');

(() => {
  loader.classList.toggle('loader-hidden');
  movieApi
    .getPopularMovies()
    .then(data => showGallery(data))
    .catch(console.log)
    .finally(() => loader.classList.toggle('loader-hidden'));
})();
