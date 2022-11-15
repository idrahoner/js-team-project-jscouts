import { API } from '../utils/api';

export const homeBtn = document.querySelector('.js-home-btn');
export const libraryBtn = document.querySelector('.js-library-btn');
export const navBtnList = document.querySelector('.js-nav-btn-list');
export const searchForm = document.querySelector('.js-search-form');
export const optionBtnList = document.querySelector(
  '.js-header__option__btn-list'
);

navBtnList.addEventListener('click', handlePageChange);
export function handlePageChange(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  searchForm.classList.toggle('hidden-in-header');
  optionBtnList.classList.toggle('hidden-in-header');
}

const obj = new API();

searchForm.addEventListener('submit', handleSubmit);
export function handleSubmit(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.search.value;
  console.log(inputValue);
  obj.setQuery(inputValue);
  obj.searchMovie();
}
