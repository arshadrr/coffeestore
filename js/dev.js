import insertTestData from './testdata.js';
import {elementIfExists} from './utils.js';

function addTestDataButton(selector, id){
		let form = elementIfExists(selector);

		let btn = document.createElement('button');
		btn.textContent = "Test Data";
		btn.setAttribute('id', id);
		btn.setAttribute('type', 'button');

		btn.classList.add('btn', 'btn--secondary');
		btn.style.margin = '1rem 0rem';

		form.append(btn)
}

const FORM_SELECTOR = '[data-coffee-order="form"]';
const BUTTON_ID = 'test-data-button'

addTestDataButton(FORM_SELECTOR, BUTTON_ID)
insertTestData("#" + BUTTON_ID, FORM_SELECTOR)
