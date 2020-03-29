import {elementIfExists} from './utils.js';

export default class Checklist {
		constructor (selector) {
				this.EDIT_STATE_ATTRIBUTE = 'data-edit-state';
				this.EDIT_STATES = {INACTIVE: null, ACTIVE: 'active', EDITING: 'editing'}

				this.checklistElement = elementIfExists(selector);
				this.editingElement = undefined;

				this.cachedChecklistItemElement = this.makeChecklistItemElement();
		}

		newRow(formData) {
				this.checklistElement.append(this.makeNewRow(formData));
		}

		makeNewRow(formData){
				let newrow = this.cachedChecklistItemElement.cloneNode(true);
				let inputEl = newrow.firstElementChild;
				let labelEl = inputEl.nextElementSibling;

				newrow.addEventListener('click', e => this.editItem(e.currentTarget));
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

		editItem (element) {
				let editState = element.getAttribute(this.EDIT_STATE_ATTRIBUTE);

				if (editState === this.EDIT_STATES.INACTIVE) {
						this.inactiveStateToActive(element)
						window.setTimeout(() => this.activeTimeoutToInactive(element), 500)
				}
				else if (editState === this.EDIT_STATES.ACTIVE) {
						this.activeStateToEditing(element)
				}
				else if (editState === this.EDIT_STATES.EDITING) {
						this.editingStateToInactive(element)
				}
		}

		inactiveStateToActive (element) {
				element.setAttribute(this.EDIT_STATE_ATTRIBUTE, this.EDIT_STATES.ACTIVE)
				element.classList.add('checklist-item--active')
		}

		activeTimeoutToInactive (element) {
				if (element.getAttribute(this.EDIT_STATE_ATTRIBUTE) !== this.EDIT_STATES.ACTIVE) {
						return;
				}

				element.removeAttribute(this.EDIT_STATE_ATTRIBUTE, this.EDIT_STATES.ACTIVE)
				element.classList.remove('checklist-item--active')
		}

		activeStateToEditing (element) {
				if (this.editingElement) this.editingStateToInactive(this.editingElement)
				this.editingElement = element

				element.setAttribute(this.EDIT_STATE_ATTRIBUTE, this.EDIT_STATES.EDITING)
				element.classList.remove('checklist-item--active')
				element.classList.add('checklist-item--editing')
		}

		editingStateToInactive (element) {
				element.removeAttribute(this.EDIT_STATE_ATTRIBUTE)
				element.classList.remove('checklist-item--editing')
		}
}
