import {strict as assert} from 'assert';
import Checklist from '../scripts/checklist.mjs';

// how should i organize test?? rn im just making one test file for each module
// TODO: figure out what browser-env actually does. for now we just copied the ava docs until it workd. the code is short.
// TODO: in the package.json, i set 'mocha': {'import': ['./test/_setup']} . what the heck is that? is it specific to mocha or it something node provides? it was 'ava':{'require': [ 'something']} but i swapped require for import. where can i find docs for this?
describe('Test CheckList', function() {
		it('makes checklist element', function(){
				assert.deepEqual(
						(document.createElement('div').
								innerHtml = `<div class="form-group"><label><input type="checkbox" value="me@exmple.com">tall mocha iced coffee, (hi@example.com) [12x]</label></div>`
						).firstElementChild,

						new Checklist('*').makeNewRow(new Map([
								['size', 'tall'],
								['flavor', 'mocha'],
								['order', 'iced coffee'],
								['email', 'hi@example.com'],
								['caffeine', '12']
						]))
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
