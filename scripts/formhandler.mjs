import {populateAndDispatch, dispatchToControl, elementIfExists} from './utils.js';


class FormHandler {
		// # Live editing
		// supports live editing form data. start this by calling this.startEditHandler, passing as argument
		// a Map() containing the values to populate the form with and edit. Provide a callback function to
		// addOnEditHandler which will be called everytime an edit is carried out.
		//
		// The form will hide the 'Submit' and 'Reset' button and will instead display a 'Done' button for when the use is done editing. Shows those two buttons again when done editing.
		constructor (selector) {
				this.formElement = elementIfExists(selector);
				this.submitButton = this.formElement.querySelector('button[type="submit"]')
				this.resetButton = this.formElement.querySelector('button[type="reset"]')
				this.doneButton = this.formElement.querySelector('button[type="button"]')
				this.editToSubmitState() // hides "Done" button

				this.resetButton.addEventListener('click', e => this.resetForm(e))
				this.doneButton.addEventListener('click', e => this.doneEditing())

				this.isLiveEditing = false;
		}

		addSubmitHandler (fn) {
				this.formElement.addEventListener('submit', event => {
						event.preventDefault()

						// pass the form data to the callback
						fn(this.getFormData())

						this.resetForm()
						this.formElement.elements[0].focus()
				})
		}

		resetForm (event) {
				// reset form controls. dispatch input event so those depending on controls value can update
				// manually resetting instead of using a reset button as need to trigger input
				// event on each form control.
				this.formElement.reset()
				Array.from(this.formElement.elements)
						.forEach(control => dispatchToControl(control, new Event('input')))
		}

		populate (formdata) {
				populateAndDispatch(this.formElement, formdata, new Event('input'));
		}

		getFormData () {
				return new Map(
						// get the data entered into this.formElement
						new FormData(this.formElement)
				)
		}

		startLiveEdit (formData, onEditHandler, doneEditHandler) {
				this.isLiveEditing = true;
				this.doneEditHandler = doneEditHandler

				this.populate(formData)
				this.submitToEditState()
				this.formElement.addEventListener('input', event => {
						if(!this.isLiveEditing) return
						onEditHandler(this.getFormData())
				})
		}

		doneEditing () {
				this.isLiveEditing = false;

				this.doneEditHandler()
				this.resetForm()
				this.editToSubmitState()
		}

		submitToEditState () {
				this.hideElement(this.submitButton)
				this.hideElement(this.resetButton)
				this.unhideElement(this.doneButton)
		}

		editToSubmitState () {
				this.unhideElement(this.submitButton)
				this.unhideElement(this.resetButton)
				this.hideElement(this.doneButton)
		}

		hideElement (element) {
				element.style.display = 'none';
		}

		unhideElement (element) {
				element.style.display = 'initial';
		}
}

class CoffeeFormHandler extends FormHandler {
		constructor(selector) {
				super(selector)

				this.lastOrderID = 0;

				this.liveEditingOrderID = undefined;
		}

		nextOrderID () {
				return this.lastOrderID += 1;
		}

		addSubmitHandler (fn) {
				super.addSubmitHandler(
						formData => {
								// include a unique order ID which isnt part of the form
								formData.set('orderid', this.nextOrderID())
								fn(formData)
						}
				)
		}

		startLiveEdit (formData, onEditHandler, doneEditHandler) {
				// formData: form data to start with
				// onEditHandler: function to be called with the form data on each edit, onEditHandler.
				// doneEditHandler: function to be called when done editing, doneEditHandler
				this.liveEditingOrderID = formData.get('orderid')
				formData.delete('orderid')

				super.startLiveEdit(
						formData,
						formData => {
								// include the order id which isnt part of the form
								formData.set('orderid', this.liveEditingOrderID)
								onEditHandler(formData)
						},
						doneEditHandler
				)
		}
}

export {
		FormHandler,
		CoffeeFormHandler
}
