const openModalEl = document.querySelector('[data-modal-open-backdrop]');
const closeModalEl = document.querySelector('[data-modal-close-backdrop]');
const backdropEl = document.querySelector('[data-modal-backdrop]');
const modalContentEl = document.querySelector('.modal__content');

openModalEl.addEventListener('click', onOpenModalEl);
backdropEl.addEventListener('click', onCloseBackdropEl);

function onOpenModalEl() {
  window.addEventListener('keydown', onCloseEsc);
  backdropEl.classList.remove('is-hidden');
  closeModalEl.addEventListener('click', onCloseModal);
  document.body.classList.add('modal-content');
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseEsc);
  backdropEl.classList.add('is-hidden');
  document.body.classList.remove('modal-content');
}

function onCloseBackdropEl(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onCloseEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
