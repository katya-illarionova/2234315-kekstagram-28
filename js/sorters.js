import {renderUsersPictures} from './miniatures.js';
import {debounce,shuffle} from './util.js';

const RANDOM_PICTURE_COUNT = 10;

const Sorter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const pictureSorters = document.querySelector('.img-filters');
const sorterButtons = document.querySelectorAll('.img-filters__button');

const getSortFunction = (activeSorter) => {
  switch (activeSorter) {
    case Sorter.RANDOM:
      return (pictures) => shuffle([...pictures], RANDOM_PICTURE_COUNT);
    case Sorter.DISCUSSED:
      return (pictures) => [...pictures].sort((a, b) => b.comments.length - a.comments.length);
    case Sorter.DEFAULT:
      return (pictures) => pictures;
    default:
      throw new Error(`Unknown sort type ${activeSorter}`);
  }
};

const setSorterListener = (data) => {
  pictureSorters.addEventListener('click', debounce(
    (evt) => {
      if (!evt.target.classList.contains('img-filters__button') || evt.target.classList.contains('img-filters__button--active')) {
        return;
      }

      sorterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');

      const activeSortFn = getSortFunction(evt.target.id);
      const currentPhotos = activeSortFn(data);
      renderUsersPictures(currentPhotos);
    }
  ));
};

const initSorters = (usersPictures) => {
  pictureSorters.classList.remove('img-filters--inactive');
  setSorterListener(usersPictures);
};

export {initSorters};
