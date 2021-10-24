const API_KEY = '23996907-65b7baf3ba7389d44636c5d9e';
const BASE_URL = `https://pixabay.com/api/`;

export default class PexelApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchHits() {
    // console.log(this);
    const query = this.searchQuery;
    const numPage = this.page;
    const params = `?image_type=photo&orientation=horizontal&q=${query}&page=${numPage}&per_page=12&key=${API_KEY}`;
    const URL = BASE_URL + params;

    return fetch(URL)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
