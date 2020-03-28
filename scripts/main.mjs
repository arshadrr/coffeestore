import Truck from './truck.mjs';
import FormHandler from './formhandler.mjs';
import Checklist from './checklist.mjs';
import RatingColor from './ratingcolor.mjs';

let FORM_SELECTOR = '[data-coffee-order="form"]';
let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

let myTruck = new Truck('ncc-1701', new Map());
let formHandler = new FormHandler(FORM_SELECTOR);
let checklistHandler = new Checklist(CHECKLIST_SELECTOR);

formHandler.addSubmitHandler(
		data => {
				myTruck.createOrder(data);
				checklistHandler.newRow(data);
		}
);

checklistHandler.removeItemHandler(myTruck.deliverOrder.bind(myTruck))

new RatingColor('.caffeine-rating__slider', '.caffeine-rating__label');

