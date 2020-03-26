export function elementIfExists(selector, root = document) {
		if(!selector) {
				throw new Error('No selector provided')
		}

		let el = root.querySelector(selector);

		if(!el) {
				throw new Error('No element exists with selector ' + selector)
		}

		return el;
}
