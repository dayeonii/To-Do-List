const searchForm = document.querySelector('#search-form');
const searchInput = document.querSelector('#search-form input');

function handleSearchSubmit(event) {
  event.preventDefault();
  const url = "https://www.google.com/search?q=" + searchInput.value;  /*구글 검색 url에 검색어 덧붙이기*/
  window.open(url);  /*검색창 열기*/
  searchInput.value = '';  /*검색어 초기화*/
}

searchForm.addEventListener('submit', handleSearchSubmit);  /*검색어 submit 하면 함수 실행*/
