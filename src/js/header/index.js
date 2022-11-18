import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { movieApi, watchedMovieStore, queueMovieStore } from '../utils';
import { showGallery, renderLibraryGallery } from '../gallery';

const libOptionBtns = document.querySelectorAll('.header__option__btn');
const pagination = document.querySelector('.pagination-container');
const gallery = document.querySelector('.gallery');
export const loader = document.querySelector('.loader');
const header = document.querySelector('.header');
const headerWrapper = document.querySelector('.header__wrapper');
const homeNavItem = document.querySelector('.js-home-nav-item');
const libNavItem = document.querySelector('.js-lib-nav-item');
const homeBtn = document.querySelector('.js-home-btn');
const libraryBtn = document.querySelector('.js-library-btn');
const navBtnList = document.querySelector('.js-nav-btn-list');
const searchForm = document.querySelector('.js-search-form');
const optionBtnList = document.querySelector('.js-header__option__btn-list');

navBtnList.addEventListener('click', handlePageChange);
function handlePageChange(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (!event.target.closest('li').classList.contains('remove-bar')) {
    return;
  }
  pagination.classList.toggle('pagination-remove');
  header.classList.toggle('header-lib-bkg');
  homeNavItem.classList.toggle('remove-bar');
  libNavItem.classList.toggle('remove-bar');

  searchForm.classList.toggle('hidden-in-header');
  optionBtnList.classList.toggle('hidden-in-header');
}

searchForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.search.value.trim().toLowerCase();
  if (inputValue === '') {
    Notify.info('Please, type movie name');
    return;
  }
  loader.classList.toggle('loader-hidden');
  movieApi.setQuery(inputValue);
  movieApi
    .searchMovies()
    .then(response => {
      if (response.results.length === 0) {
        Notify.failure('No such movie');
        return;
      }
      return showGallery(response);
    })
    .catch(console.log)
    .then(() => loader.classList.toggle('loader-hidden'));
  event.currentTarget.reset();
}

headerWrapper.addEventListener('click', handleDirectToMain);
function handleDirectToMain(event) {
  if (
    event.target.classList.contains('logo') ||
    event.target.classList.contains('js-home-btn') ||
    event.target.classList.contains('logo__svg') ||
    event.target.classList.contains('logo__text')
  ) {
    location.reload();
  }
}
// library render

libraryBtn.addEventListener('click', handleDirectToLibrary);
function handleDirectToLibrary() {
  const myLibraryItems = queueMovieStore.getItems();

  if (myLibraryItems === null || myLibraryItems.length === 0) {
    Notify.info('Your queue list is empty');
    gallery.innerHTML =
      '<p class="empty-library-text" >Your queue is empty</p>';
    return;
  }
  renderLibraryGallery(myLibraryItems);
}

// watched and queue features

optionBtnList.addEventListener('click', handleLibOptionsChange);
function handleLibOptionsChange(event) {
  if (
    event.target.nodeName !== 'BUTTON' ||
    event.target.classList.contains('header__option__btn--active')
  ) {
    return;
  }
  libOptionBtns.forEach(btn => {
    btn.classList.toggle('header__option__btn--active');
  });
  if (event.target.classList.contains('js-watched-btn')) {
    const myWatchedItems = watchedMovieStore.getItems();
    if (myWatchedItems === null || myLibraryItems.length === 0) {
      Notify.info('Your watched list is empty');
      gallery.innerHTML =
        '<p class="empty-library-text" >Your watch list is empty</p>';
      return;
    }
    renderLibraryGallery(myWatchedItems);
    return;
  }
  if (event.target.classList.contains('js-queue-btn')) {
    const myQueuedItems = queueMovieStore.getItems();
    if (myQueuedItems === null || myLibraryItems.length === 0) {
      Notify.info('Your queue list is empty');
      gallery.innerHTML =
        '<p class="empty-library-text" >Your queue is empty</p>';
      return;
    }
    renderLibraryGallery(myQueuedItems);
  }
}
