import {generatePhotoElements} from './thumbnails.js';
import {createNewPhotoDescriptionList} from './data.js';
import './load-form.js';
const descriptionsList = createNewPhotoDescriptionList();

const getDescriptionsList = () => descriptionsList;
generatePhotoElements(descriptionsList);

export {getDescriptionsList};
