// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// https://pixabay.com/api/docs/
// my API KEY: 41990967-a01a4811db23696ec0b17c82e
const searchForm = document.querySelector('#searchForm');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.simplelightbox-gallery');
searchForm.addEventListener('submit', handleSearch);
const searchInput = document.getElementById('searchInput');
const mainGallery = new SimpleLightbox('.gallery a');

function performSearch(searchTerm) {
  const API_KEY = '41990967-a01a4811db23696ec0b17c82e';
  const BASE_URL = 'https://pixabay.com/api/';
  const IMAGE_TYPE = 'photo';
  const ORIENTATION = 'horizontal';
  const SAFE_SEARCH = true;

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchTerm}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFE_SEARCH}`;

  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'Caution',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        handleSearchResults(data.hits);
      }
    })
    .catch(err => {
      handleError(err);
    })
    .finally(() => (loader.style.display = 'none'));
}

function handleSearch(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  gallery.innerHTML = '';
  if (searchTerm === '') {
    return;
  }
  loader.style.display = 'block';
  performSearch(searchTerm);
  searchForm.reset();
}

function handleSearchResults(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" class="image" />
        <ul class="item-list">
          <li class="block">
            <p><b >Likes</b><br> ${likes}</p>
          </li>
          <li class="block">
           <p><b>Views</b><br> ${views}</p>
          </li >
          <li class="block">
            <p><b>Comments</b><br> ${comments}</p>
          </li>
          <li class="block">
            <p><b>Downloads</b><br> ${downloads}</p>
          </li>
        </ul>
    </a>
        
      </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  mainGallery.refresh();
}

function handleError(err) {
  iziToast.error({
    title: 'Error',
    message: 'An error occurred. Please try again later.',
  });
}
