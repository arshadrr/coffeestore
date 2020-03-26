import insertTestData from './testdata.js';
import {elementIfExists} from './utils.js';

function addTestDataButton(selector, id){
		let form = elementIfExists(selector);

		let btn = document.createElement('button');
		btn.textContent = "Test Data";
		btn.setAttribute('id', id);
		btn.setAttribute('type', 'button');

		btn.classList.add('btn', 'btn--secondary');

		form.append(btn)
}

const FORM_SELECTOR = '[data-coffee-order="form"]';
const BUTTON_ID = 'test-data-buttton'

addTestDataButton(FORM_SELECTOR, BUTTON_ID)
insertTestData("#" + BUTTON_ID, FORM_SELECTOR)
