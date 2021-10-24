import photoCardTpl from '../templates/photo-card.hbs';
import debounce from 'lodash.debounce';
import PexelApiService from './apiService';

const searchForm = document.querySelector('.search-form');
const galery = document.querySelector('.galery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const pexelApiService = new PexelApiService();
// console.log(searchForm);

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearGaleryList();
  pexelApiService.query = e.currentTarget.elements.query.value;

  if (pexelApiService.query === '') {
    return alert('Введите запрос');
  }

  pexelApiService.resetPage();
  pexelApiService.fetchHits().then(renderPhotoList);
}

function onLoadMore() {
  pexelApiService.fetchHits().then(renderPhotoList);
}

/* ----------------------------- рендер карточек ---------------------------- */
function renderPhotoList(hits) {
  const markup = photoCardTpl(hits);
  galery.insertAdjacentHTML('beforeend', markup);
}
/* ----------------------------- очистка инпута ----------------------------- */
function clearGaleryList() {
  galery.innerHTML = '';
}

// function clearInput() {
//   searchForm.value = '';
// }

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
