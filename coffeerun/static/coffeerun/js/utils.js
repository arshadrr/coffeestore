function elementIfExists(selector, root = document) {
		if(!selector) {
				throw new Error('No selector provided')
		}

		let el = root.querySelector(selector);

		if(!el) {
				throw new Error('No element exists with selector ' + selector)
		}

		return el;
}

function populateAndDispatch (formElement, formData, event) {
		for(const [name, value] of formData){
				let formControl = formElement.elements[name]
				formControl.value = value;
				dispatchToControl(formControl, event, value);
		}
}

function dispatchToControl (formControl, event, radioValue) {
		// formControl: Element or RadioNoteList
		if (formControl instanceof RadioNodeList) {
				// dispatch event on the specific radio button value was changed to
				for (const radio of formControl) {
						if(radioValue == undefined) {
								break;
						}

						if (radio.value === radioValue) {
								radio.dispatchEvent(event);
								break;
						}
				}
		} else{
				formControl.dispatchEvent(event);
		}
}

export {
		elementIfExists,
		populateAndDispatch,
		dispatchToControl
}
