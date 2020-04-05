import {CoffeeFormHandler} from './formhandler.mjs';
import {Checklist} from './checklist.mjs';
import RatingColor from './ratingcolor.mjs';

let FORM_SELECTOR = '[data-coffee-order="form"]';
let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

let formHandler = new CoffeeFormHandler(FORM_SELECTOR);
let checklistHandler = new Checklist(CHECKLIST_SELECTOR);

formHandler.addSubmitHandler(
		checklistHandler.newRow.bind(checklistHandler)
)
checklistHandler.addStartEditingHandler(
		formHandler.startLiveEdit.bind(formHandler)
)
new RatingColor('.caffeine-rating__slider', '.caffeine-rating__label');
