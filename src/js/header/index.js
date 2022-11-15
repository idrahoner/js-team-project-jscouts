import { API } from '../utils/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import card from '../../templates/card.hbs';

export const loader = document.querySelector('.loader');
export const header = document.querySelector('.header');
export const headerWrapper = document.querySelector('.header__wrapper');
export const homeNavItem = document.querySelector('.js-home-nav-item');
export const libNavItem = document.querySelector('.js-lib-nav-item');
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
  if (!event.target.closest('li').classList.contains('remove-bar')) {
    return;
  }
  header.classList.toggle('header-lib-bkg');
  homeNavItem.classList.toggle('remove-bar');
  libNavItem.classList.toggle('remove-bar');

  searchForm.classList.toggle('hidden-in-header');
  optionBtnList.classList.toggle('hidden-in-header');
}

const obj = new API();

searchForm.addEventListener('submit', handleSubmit);
export function handleSubmit(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.search.value.trim().toLowerCase();
  if (inputValue === '') {
    Notify.info('Please, type movie name');
    return;
  }
  loader.classList.toggle('loader-hidden');
  obj.setQuery(inputValue);
  obj
    .searchMovie()
    .then(data => {
      if (data.results.length === 0) {
        Notify.failure('No such movie');
      }
    })
    .catch(console.log)
    .then(() => loader.classList.toggle('loader-hidden'));

  event.currentTarget.reset();
}

headerWrapper.addEventListener('click', handleDirectToMain);
export function handleDirectToMain(event) {
  console.log(event.target);
  if (
    event.target.classList.contains('logo') ||
    event.target.classList.contains('js-home-btn') ||
    event.target.classList.contains('logo__svg') ||
    event.target.classList.contains('logo__text')
  ) {
    location.reload();
  }
}
