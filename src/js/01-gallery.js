// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const galleryEl = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items
    .map(
      item =>
        `<li class="gallery-item">
        <a class="gallery__link" href="${item.original}">
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
          />
        </a>
      </li>`
    )
    .join('');
}


const addGalleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.innerHTML = addGalleryMarkup;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

galleryEl.addEventListener('click', onImageClick);

function onImageClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }


    lightbox.open({ source: evt.target.dataset.source });

  galleryEl.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      lightbox.close();
      document.removeEventListener('keydown', onImageClick);
    }
  });
}

galleryEl.addEventListener('click', onImageClick);

console.log(galleryItems);
