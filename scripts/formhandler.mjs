import {populateAndDispatch, dispatchToControl, elementIfExists} from './utils.js';


export default class FormHandler {
		constructor (selector) {
				this.formElement = elementIfExists(selector);

				if (!this.formElement instanceof HTMLFormElement){
						throw new Error('Not an HTMLFormElement' + selector)
				}

				this.lastOrderID = 0;

				this.resetButton = this.formElement.querySelector('button[type="reset"]')
				// if element exists, register event handler
				if(this.resetButton) this.resetButton.addEventListener('click', e => this.resetForm(e))
		}

		nextOrderID () {
				return this.lastOrderID += 1;
		}

		addSubmitHandler (fn) {
				this.formElement.addEventListener('submit', event => {
						event.preventDefault()

						const data = new Map(
								// get the data entered into this.formElement
								new FormData(this.formElement)
						)
						// include a unique order ID
						data.set('orderid', this.nextOrderID())

						// pass the form data to the callback
						fn(data)

						this.formElement.reset()
						this.formElement.elements[0].focus()
						// form controls reset. dispatch input event so those depending on controls value can update
						Array.from(this.formElement.elements)
								.forEach(control => dispatchToControl(control, new Event('input')))
				})
		}

		resetForm (event) {
				// manually resetting instead of using a reset button as need to trigger input
				// event on each form control
				this.formElement.reset()
				Array.from(this.formElement.elements)
						.forEach(control => dispatchToControl(control, new Event('input')))
		}

		populate (formdata) {
				populateAndDispatch(formElement, testData, new Event('input'));
		}
}
