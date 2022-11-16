import Pagination from 'tui-pagination';
import { renderGallery } from '../gallery';
import { API } from '../utils/api';

const movieApi = new API();

const PER_PAGE = 20;

const containerEl = document.getElementById('pagination');
const options = {
  totalItems: 10000,
  itemsPerPage: PER_PAGE,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export async function showGallery(response) {
  const responseOptions = {
    totalItems: response.total_results,
  };
  const pagination = new Pagination(containerEl, {
    ...options,
    ...responseOptions,
  });
  pagination.on('beforeMove', function () {
    movieApi.increasePage();
    movieApi.getPopularMovies().then(({ results }) => renderGallery(results));
  });

  console.log(response);
  await renderGallery(response.results);
}
