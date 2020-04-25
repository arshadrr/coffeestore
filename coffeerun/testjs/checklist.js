import {strict as assert} from 'assert';
import {Checklist, ChecklistItem} from '../static/coffeerun/js/checklist.js';

// TODO: are these ok names for them? should i have the word "fixture" in the variable name? test fixtures
// are they even test fixtures? they arent test data?
let COFFEE_ORDER_1 = new Map([
    ['size', 'tall'],
    ['flavor', 'mocha'],
    ['order', 'iced coffee'],
    ['email', 'hi@example.com'],
    ['caffeine', '12'],
    ['orderid', '1']
])

let COFFEE_ORDER_2 = new Map([
    ['size', 'tall'],
    ['flavor', 'mocha'],
    ['order', 'iced coffee'],
    ['email', 'hi@example.com'],
    ['caffeine', '12'],
    ['orderid', '2']
])
// TODO: figure out what browser-env actually does. for now we just copied the ava docs until it workd. the code is short.
// TODO: in the package.json, i set 'mocha': {'import': ['./test/_setup']} . what the heck is that? is it specific to mocha or it something node provides? it was 'ava':{'require': [ 'something']} but i swapped require for import. where can i find docs for this?
// TODO: this method of testing is scary. a global document?? each test case has the chance of mutating something about it!
// using an HTML string like this is difficult. the order of attributes within the tag matters!
// should we be setting up the html by injecting stuff into the document.body?
describe('Test ChecklistItem', function() {
    it('makes checklist element', function(){
        assert.deepEqual(
            '<div class="checklist-item" data-order-id="1"><input class="checklist-item__checkbox" type="checkbox"><label class="checklist-item__label">tall mocha iced coffee, (hi@example.com) [12x]</label></div>',
            ChecklistItem.prototype.makeNewItem(COFFEE_ORDER_1).outerHTML
        )
    })

    it('makes order label', function(){
        assert.equal(
            'tall mocha iced coffee, (hi@example.com) [12x]',
            ChecklistItem.prototype.makeChecklistLabel(COFFEE_ORDER_1)
        )
    })
})

describe('Test CheckList', function() {

    describe('DOM mutating test', function(){
        beforeEach(function() {
            document.body.innerHTML = '<div class="card__body" data-coffee-order="checklist"></div>';
            this.checklist = new Checklist('[data-coffee-order="checklist"]');

            this.checklist.newRow(COFFEE_ORDER_1)
            this.checklist.newRow(COFFEE_ORDER_2)

            this.item1 = document.querySelector('[data-order-id="1"]')
            this.item2 = document.querySelector('[data-order-id="2"]')
        })

        describe('test removeItem()', function(){
            it('doesnt remove the other row' ,function() {
                debugger;
                this.item1.dispatchEvent(new Event('input'))
                assert.notEqual(
                    document.querySelector('[data-order-id="2"]'),
                    null
                )
            })
            it('removes the specified row', function() {
                this.item1.dispatchEvent(new Event('input'))
                    console.log(document.querySelector('[data-order-id="1"]'))
                assert.equal(
                    document.querySelector('[data-order-id="1"]'),
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
