export default class Checklist {
		constructor (selector) {
				if(!selector) {
						throw new Error("No selector provided")
				}

				this.checklistElement = document.querySelector(selector);

				if(!selector) {
						throw new Error("Could not find element with selector " + selector);
				}

				this.cachedChecklistItemElement = this.makeChecklistItemElement();
		}

		newRow(formData) {
				this.checklistElement.append(this.makeNewRow(formData));
		}

		makeNewRow(formData){
				let newrow = this.cachedChecklistItemElement.cloneNode(true);
				let inputEl = newrow.firstElementChild;
				let labelEl = inputEl.nextElementSibling;

				inputEl.setAttribute('value', formData.get('email'));

				labelEl.append(this.makeChecklistLabel(formData));

				return newrow;
		}

		makeChecklistItemElement() {
				let formGroup = document.createElement('div')
				formGroup.classList.add('form-group')

				let labelEl = document.createElement('label')

				let inputEl = document.createElement('input')
				inputEl.setAttribute('type', 'checkbox')
				inputEl.setAttribute('value', '')

				formGroup.append(inputEl);
				formGroup.append(labelEl);

				return formGroup
		}

		makeChecklistLabel(formData){
				return `${formData.get('size')} ${formData.get('flavor')} ${formData.get('order')}, (${formData.get('email')}) [${formData.get('caffeine')}x]`
		}

		removeRow(email){
				//TODO: when you use browser-env, the document object is shared between all your test. this cant be good
				this.checklistElement
						.querySelector(`[value="${email}"]`)
						.parentElement
						.remove();
		}

		addClickHandler(callback){
				this.checklistElement.addEventListener(
						'input',
						event => {
								if (!event.target.matches('input')) return;

								let email = event.target.value;
								this.removeRow(email);
								callback(email);
						}
				)
		}

		addEditHandler(callback){
				this.checklistElement.addEditHandler(
						'click',
						event => {
						}
				)
		}


}
