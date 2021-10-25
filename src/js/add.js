import photoCardTpl from '../templates/photo-card.hbs';
import PexelApiService from './apiService';
import LoadMoreBtn from './load-more-btn';

const searchForm = document.querySelector('.search-form');
const galery = document.querySelector('.galery');
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pexelApiService = new PexelApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', featchPhotos);

function onSearch(e) {
  e.preventDefault();

  pexelApiService.query = e.currentTarget.elements.query.value;

  if (pexelApiService.query === '') {
    return alert('Введите запрос');
  }

  clearInput();
  clearGaleryList();
  loadMoreBtn.show();
  pexelApiService.resetPage();
  featchPhotos();
}

function featchPhotos() {
  loadMoreBtn.disable();
  pexelApiService
    .fetchHits()
    .then(hits => {
      renderPhotoList(hits);
      loadMoreBtn.enable();
    })
    .cetch(err => {
      alert(err);
    });
}

/* ----------------------------- рендер карточек ---------------------------- */
function renderPhotoList(hits) {
  const markup = photoCardTpl(hits);
  galery.insertAdjacentHTML('beforeend', markup);
}
/* ----------------------------- очистка полей ----------------------------- */
function clearGaleryList() {
  galery.innerHTML = '';
}

function clearInput() {
  searchForm[0].value = '';
}

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
