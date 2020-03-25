export default class FormHandler {
  constructor (selector) {
    if (!selector) {
      throw new Error('No selector provided')
    }

    this.formElement = document.querySelector(selector)
    if (this.formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector)
    }
	if (!this.formElement instanceof HTMLFormElement){
	  throw new Error('Not an HTMLFormElement' + selector)
	}
  }

  addSubmitHandler (fn) {
		  // TODO: what is 'this' in this case?
		  // why does 'this' have a `formElement` property
		  this.formElement.addEventListener('submit', event => {
				  event.preventDefault()

				  const data = new Map(
						  new FormData(this.formElement)
				  )

				  fn(data)

				  this.formElement.reset()
				  this.formElement.elements[0].focus()
		  })
  }

  populate (formdata){
		  let elements = this.formElement.elements
		  for (const [name, value] of formdata){
				  elements.namedItem(name).value = value
		  }
  }
}
