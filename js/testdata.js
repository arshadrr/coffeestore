import {populateAndDispatch, elementIfExists} from './utils.js';

export default function insertTestData (buttonSelector, formSelector) {
		const [buttonElement, formElement] = [buttonSelector, formSelector].map(s => elementIfExists(s))

		const testData = new Map([
				['size', 'Tall'],
				['flavor', 'Mocha'],
				['order', 'Iced Coffee'],
				['email', 'person2@example.com'],
				['caffeine', '12']
		])

		buttonElement.addEventListener(
				'click',
				event => {
						populateAndDispatch(formElement, testData, new Event('input'));
				}
		)
}
