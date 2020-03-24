import {strict as assert} from 'assert';
import Checklist from '../scripts/checklist.mjs';

// TODO: figure out what browser-env actually does. for now we just copied the ava docs until it workd. the code is short.
// TODO: in the package.json, i set 'mocha': {'import': ['./test/_setup']} . what the heck is that? is it specific to mocha or it something node provides? it was 'ava':{'require': [ 'something']} but i swapped require for import. where can i find docs for this?
describe('Test CheckList', function() {
		it('makes checklist element', function(){
				assert.deepEqual(
						// TODO: figure out how to have test fixtures. figure out before() and after()
						//(document.createElement('div').
						//		innerHtml = `<div class="form-group"><label>tall mocha iced coffee, (hi@example.com) [12x]</label><input type="checkbox" value="hi@example.com"></div>`
						//).firstElementChild,

						'<div class="form-group"><input type="checkbox" value="hi@example.com"><label>tall mocha iced coffee, (hi@example.com) [12x]</label></div>',
						new Checklist('*').makeNewRow(new Map([
								['size', 'tall'],
								['flavor', 'mocha'],
								['order', 'iced coffee'],
								['email', 'hi@example.com'],
								['caffeine', '12']
						])).outerHTML
				)
		})

		it('makes order label', function(){
				assert.equal(
						'tall mocha iced coffee, (hi@example.com) [12x]',
						Checklist.prototype.makeChecklistLabel(new Map([
								['size', 'tall'],
								['flavor', 'mocha'],
								['order', 'iced coffee'],
								['email', 'hi@example.com'],
								['caffeine', '12']
						]))
				)
		})
})
