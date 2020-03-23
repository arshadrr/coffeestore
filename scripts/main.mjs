import Truck from './truck.mjs';
import FormHandler from './formhandler.mjs';
import Checklist from './checklist.mjs';
import RatingColor from './ratingcolor.mjs';

let FORM_SELECTOR = '[data-coffee-order="form"]';
let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

let myTruck = new Truck('ncc-1701', new Map());
let formHandler = new FormHandler(FORM_SELECTOR);
let checklistHandler = new Checklist(CHECKLIST_SELECTOR);

// TODO: remove all the css from the index.html and in a methodological way, recreate it. come up with your own color palette. decide on how cards. buttons, inputs should look like, etc.
// https://spaceninja.com/2018/09/18/what-is-modular-css/
//https://cssguidelin.es/
//https://lobste.rs/search?utf8=%E2%9C%93&q=smacss&what=stories&order=points
//organize: https://blog.carlmjohnson.net/post/2020/python-square-of-opposition/
//TODO:https://www.reddit.com/r/acne/comments/53urir/acne_around_the_mouth_question/d7wz9ek/ 
	//- it doesnt count if the exfoliant is in the facewash???
formHandler.addSubmitHandler(
		data => {
				myTruck.createOrder(data);
				checklistHandler.newRow(data);
		}
);

checklistHandler.addClickHandler(myTruck.deliverOrder.bind(myTruck))

// since its a class, its not very specific. how should we handle this instead?
new RatingColor('.caffeine-rating__slider', '.caffeine-rating__label');

`
- figure out what bootstrap class card-columns id doing (the css columns property)
- contentEditable and document.designMode are crazy! look into document.execCommand and others
- look into MutationObserver API

- the book specifies a charset=utf-8 attribute for each script tag. should i too?
- when i deploy my code, what stops some random others from being able to access all my sourcecode files the same way i can access js files? what if its a node app and there is no difference between the two?

interesting things to watch out for about the checklist module:

 - so the formhandler module is supposed to be a bridge between the form and the other modules. see if checklist will be inserting stuff into the form or if it will delegate this to formhandler
 - checklist will signal truck module to remove stuff when unchecked. will checklist know of truck module itself or will it take a 'deletehandler'(so we can do dependency injection)
 - checkboxes will need to be inserted dynamically. will we 
`
