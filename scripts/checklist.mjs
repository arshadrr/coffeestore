import {elementIfExists} from './utils.js';

export default class Checklist {
		constructor (selector) {
				this.checklistElement = elementIfExists(selector);

				this.cachedChecklistItemElement = this.makeChecklistItemElement();
		}

		newRow(formData) {
				this.checklistElement.append(this.makeNewRow(formData));
		}

		makeNewRow(formData){
				let newrow = this.cachedChecklistItemElement.cloneNode(true);
				let inputEl = newrow.firstElementChild;
				let labelEl = inputEl.nextElementSibling;

				inputEl.setAttribute('value', formData.get('orderid'));

				labelEl.append(this.makeChecklistLabel(formData));

				return newrow;
		}

		makeChecklistItemElement() {
				let formGroup = document.createElement('div')
				formGroup.classList.add('checklist-item')

				let labelEl = document.createElement('label')
				labelEl.classList.add('checklist-item__label');

				let inputEl = document.createElement('input')
				inputEl.classList.add('checklist-item__checkbox');
				inputEl.setAttribute('type', 'checkbox')
				inputEl.setAttribute('value', '')

				formGroup.append(inputEl);
				formGroup.append(labelEl);

				return formGroup
		}

		makeChecklistLabel(formData){
				return `${formData.get('size')} ${formData.get('flavor')} ${formData.get('order')}, (${formData.get('email')}) [${formData.get('caffeine')}x]`
		}

		removeRow(orderID){
				//TODO: refactor this. i dont like having to walk the DOM
				this.checklistElement
						.querySelector(`[value="${orderID}"]`)
						.parentElement
						.remove();
		}

		removeItemHandler(callback){
				this.checklistElement.addEventListener(
						'input',
						event => {
								let orderID = event.target.value;
								this.removeRow(orderID);
								callback(orderID);
						}
				)
		}
}
