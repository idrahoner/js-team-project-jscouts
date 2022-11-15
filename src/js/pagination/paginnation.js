// export async function puggination() {
//     const responce = await fetch('https://developers.themoviedb.org/3/trending/get-trending');
//     const film = await responce.json()
//     return film
// }
// async function main() {
//     const postsData = await puggination();
//     const currentPage = 1;
//     const rows = 20;
//     function displayList(arrPost, rowPerPage, page) {
//         const postsEl = document.querySelector('.posts');
//         const start = rowPerPage * page;
//         const end = start + rowPerPage;
//         const paginationPost = arrPost.slice(start , end);
//         paginationPost.forEach((el) => {
//             const postEl = document.createElement("div");
//             postEl.classList.add("post")
//             postEl.innerHTML += el;
//             postsEl.append(postEl);
//         });
//     }
//     function displayPagination() { }
//     function displayPaginationBtn() { }
// displayList(postsData,rows,currentPage);
// }
// main()


const API_KEY = 
const API_URL_POPULAR = 'https://developers.themoviedb.org/3/trending/get-trending';