import {CoffeeFormHandler} from './formhandler.js';
import {Checklist} from './checklist.js';
import RatingColor from './ratingcolor.js';

let FORM_SELECTOR = '[data-coffee-order="form"]';
let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

let orderStore = new Map();
let formHandler = new CoffeeFormHandler(FORM_SELECTOR, orderStore);
let checklistHandler = new Checklist(CHECKLIST_SELECTOR, orderStore);

formHandler.addSubmitHandler(
    checklistHandler.newRow.bind(checklistHandler)
)
checklistHandler.addStartEditingHandler(
    formHandler.startLiveEdit.bind(formHandler)
)
new RatingColor('.caffeine-rating__slider', '.caffeine-rating__label');
