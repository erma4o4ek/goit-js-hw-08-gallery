import images from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const refs = {
  galleryList: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  lightbox__image: document.querySelector(".lightbox__image"),
};

const createImage = (item, parent) => {
const {preview, description, original} = item;
const img = document.createElement('img');
img.classList.add('gallery__image');
img.dataset.source = original;
img.src = preview;
img.alt = description;
parent.appendChild(img);
};

const createLink = (item, parent) => {
  const { original } = item;
  const a = document.createElement('a');
  a.classList.add('gallery__link');
  a.href = original;
  createImage(item, a);
  parent.appendChild(a);
};

const createItem = (item) => {
  const li = document.createElement('li');
  li.classList.add('gallery__item');
  createLink(item, li);
  return li;
};

const renderListItems = (arr) => {
  const items = arr.map( (item) => createItem(item));
  refs.galleryList.append(...items);
};

renderListItems(images);



function onClickHandler(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  if (e.target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
    refs.lightbox__image.src = e.target.getAttribute("data-source");
    refs.lightbox__image.alt = e.target.alt;
  }
}

function onCloseHandler(e) {
  if(e.target.nodeName === "I" || e.target.nodeName === "BUTTON") {
    refs.lightbox.classList.remove('is-open');
  }
}

refs.galleryList.addEventListener('click', onClickHandler);
refs.btn.addEventListener('click', onCloseHandler);





