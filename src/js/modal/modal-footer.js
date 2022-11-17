const openModalBtn = document.querySelector('[data-modal-open-backdrop]');
const closeModalBtn = document.querySelector('[data-modal-close-backdrop]');
const backdropEl = document.querySelector('[data-modal-backdrop]');

openModalBtn.addEventListener('click', teemModal);
closeModalBtn.addEventListener('click', teemModal);
backdropEl.addEventListener('click', closeModal);

function teemModal() {
  backdropEl.classList.toggle('is-hidden');
}
function closeModal() {
  backdropEl.classList.add('is-hidden');
}
document.addEventListener('keydown', evt => {
  if (evt.code === 'Escape') {
    closeModal();
  }
});
