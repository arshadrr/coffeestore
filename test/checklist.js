import {strict as assert} from 'assert';
import Checklist from '../scripts/checklist.mjs';

// TODO: figure out what browser-env actually does. for now we just copied the ava docs until it workd. the code is short.
// TODO: in the package.json, i set 'mocha': {'import': ['./test/_setup']} . what the heck is that? is it specific to mocha or it something node provides? it was 'ava':{'require': [ 'something']} but i swapped require for import. where can i find docs for this?
// TODO: TODO: this method of testing is scary. a global document?? each test case has the chance of mutating something about it!
// is it right to use html strings like this?
// should we be setting up the html by injecting stuff into the document.body?
describe('Test CheckList', function() {
		it('makes checklist element', function(){
				assert.deepEqual(
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

		describe('DOM mutating test', function(){
				beforeEach(function() {
						document.body.innerHTML = '<div class="card__body" data-coffee-order="checklist"></div>';
						this.checklist = new Checklist('[data-coffee-order="checklist"]');
						this.checklist.newRow(new Map([
								['size', 'tall'],
								['flavor', 'mocha'],
								['order', 'iced coffee'],
								['email', 'person1@example.com'],
								['caffeine', '12']
						]))

						this.checklist.newRow(new Map([
								['size', 'tall'],
								['flavor', 'mocha'],
								['order', 'iced coffee'],
								['email', 'person2@example.com'],
								['caffeine', '12']
						]))
				})

								// TODO: test data is everywhere. why duplicate it so much?
				describe('test removeRow()', function(){
						it('doesnt remove the other row' ,function() {
								this.checklist.removeRow('person1@example.com');
								assert.notEqual(
										document.querySelector('input[value="person2@example.com"]'),
										null
								)
						})
						it('removes the specified row', function() {
								this.checklist.removeRow('person1@example.com');
								assert.equal(
										document.querySelector('input[value="person1@example.com"]'),
										null
								)
						})
				})

				afterEach(function() {
						// should this come after all the it() calls or right after the beforeEach?
						// should i be setting the variables to undefined? when mocha provides a context, will ALL the functions get the same context??? TODO: experiment with this
						// TODO: i dont know how nestin before, after, and others will work!!
						//https://www.zsoltnagy.eu/Asynchronous-Tests-and-Fixtures-with-Mocha-and-ChaiJs/
						//a guide to testing with mocha. might be useful
						document.body.innerHTML = "";
						this.checklist = undefined;
				})
		})
})
