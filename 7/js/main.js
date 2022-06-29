import {generatePhotoElements} from './thumbnails.js';
import {createNewPhotoDescriptionList} from './data.js';
const descriptionsList = createNewPhotoDescriptionList();

generatePhotoElements(descriptionsList);
