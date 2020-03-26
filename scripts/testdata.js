import {elementIfExists} from './utils.js';

export default function insertTestData (buttonSelector, formSelector) {
		const [buttonElement, formElement] = [buttonSelector, formSelector].map(s => elementIfExists(s))

		const testData = new Map([
				['size', 'tall'],
				['flavor', 'mocha'],
				['order', 'iced coffee'],
				['email', 'person2@example.com'],
				['caffeine', '12']
		])

		buttonElement.addEventListener(
				'click',
				event => {
						for(const [name, value] of testData){
								formElement.elements.namedItem(name).value = value;
						}
				}
		)
}
