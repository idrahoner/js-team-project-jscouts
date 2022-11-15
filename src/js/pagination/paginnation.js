//  export async function getPost() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await response.json();
//     return data;
//   }

//   async function main() {
//     const postsData = await getPost();
//     let currentPage = 1;
//     let rows = 20;

//     function displayList(arrData, rowPerPage, page) {
//       const postsEl = document.querySelector('.posts');
//       postsEl.innerHTML = "";
//       page--;

//       const start = rowPerPage * page;
//       const end = start + rowPerPage;
//       const paginatedData = arrData.slice(start, end);

//       paginatedData.forEach((el) => {
//         const postEl = document.createElement("div");
//         postEl.classList.add("post");
//         postEl.innerHTML = el;
//         postsEl.appendChild(postEl);
//       })
//     }

//     function displayPagination(arrData, rowPerPage) {
//       const paginationEl = document.querySelector('.pagination');
//       const pagesCount = Math.ceil(arrData.length / rowPerPage);
//       const ulEl = document.createElement("ul");
//       ulEl.classList.add('pagination__list');

//       for (let i = 0; i < pagesCount; i++) {
//         const liEl = displayPaginationBtn(i + 1);
//         ulEl.appendChild(liEl)
//       }
//       paginationEl.appendChild(ulEl)
//     }

//     function displayPaginationBtn(page) {
//       const liEl = document.createElement("li");
//       liEl.classList.add('pagination__item')
//       liEl.innerText = page

//       if (currentPage == page) liEl.classList.add('pagination__item--active');

//       liEl.addEventListener('click', () => {
//         currentPage = page
//         displayList(postsData, rows, currentPage)

//         let currentItemLi = document.querySelector('li.pagination__item--active');
//         currentItemLi.classList.remove('pagination__item--active');

//         liEl.classList.add('pagination__item--active');
//       })

//       return liEl;
//     }

//     displayList(postsData, rows, currentPage);
//     displayPagination(postsData, rows);
//   }

//   main();

import { API } from '../utils/api';

const postsEl = document.querySelector('.posts');
const movieApi = new API();

export function main() {
  movieApi
    .getPopularMovies()
    .then(({ results }) => {
      console.log(results);
      return results[0];
    })
    .then(movie => {
      postsEl.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />`;
    });
}
