import photoCardTpl from '../templates/photo-card.hbs';

const API_KEY = '23996907-65b7baf3ba7389d44636c5d9e';
const query = 'sun';
const numPage = 1;
const BASE_URL = `https://pixabay.com/api/`;
const params = `?image_type=photo&orientation=horizontal&q=${query}&page=${numPage}&per_page=12&key=${API_KEY}`;
const URL = BASE_URL + params;

const gallery = document.querySelector('.galery');
// export default
// function fetchPhotos(searchQuery) {
fetch(URL)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    // const markup = photoCardTpl(data);
    // console.log(markup);
    gallery.innerHTML = photoCardTpl(data.hits);
  })
  .catch(
    err => err,
    // console.log(err);
  );
// }
// ====================
// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
