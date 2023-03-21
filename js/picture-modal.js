import {isEscapeKey} from './util.js';

const modalElement = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const getPhoto = ({url, comments, likes, description}) => {
  modalElement.querySelector('.big-picture__img img').src = url;
  modalElement.querySelector('.likes-count').textContent = likes;
  modalElement.querySelector('.comments-count').textContent = comments.length;
  modalElement.querySelector('.social__caption').textContent = description;
};

const getComments = (comments) => {
  commentsList.innerHTML = '';

  comments.forEach(({avatar, message, name}) => {
    const comment = commentTemplate.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    fragment.appendChild(comment);
  });

  commentsList.appendChild(fragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = (photo) => {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  getPhoto(photo);
  getComments(photo.comments);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

export {openModal, closeModal};
