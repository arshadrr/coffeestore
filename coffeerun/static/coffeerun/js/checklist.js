import {elementIfExists} from './utils.js';

class Checklist {
    constructor (selector, orderStore = new Map()) {
        this.checklistElement = elementIfExists(selector)

        this.orderStore = orderStore
    }

    newRow (order) {
        let orderID = order.get('orderid')

        let item = new ChecklistItem(this.checklistElement, order)
        item.addRemoveHandler(() => this.removeItem(orderID))
        item.addStartEditingHandler((onEditHandler, doneEditHandler) => {
            this.startEditingHandler(
                this.orderStore.get(orderID),
                (order) => {
                    onEditHandler(order)
                    this.updateOrder(order)
                },
                doneEditHandler
            )
        })
    }

    removeItem (orderID) {
        this.orderStore.delete(orderID)
    }

    updateOrder (order) {
        let orderID = order.get('orderid')

        this.orderStore.set(orderID, order)
    }

    addStartEditingHandler (startEditingHandler) {
        this.startEditingHandler = startEditingHandler
    }
}

class ChecklistItem {
    constructor (checklistElement, order) {
        this.EDIT_STATE_ATTRIBUTE = 'data-edit-state';
        this.EDIT_STATES = {INACTIVE: null, ACTIVE: 'active', EDITING: 'editing'}

        this.checklistItemElement = this.makeNewItem(order)
        checklistElement.append(this.checklistItemElement)
    }


    makeNewItem(order){
        let orderID = order.get('orderid')
        let newitem = this.makeChecklistItemElement()
        let labelEl = this.getChecklistItemLabel(newitem)

        // if the item was clicked, the user might mean to edit
        newitem.addEventListener('click', e => this.editItem(this.checklistItemElement));
        // if the checkbox was clicked, remove the item
        newitem.addEventListener('input', e => {
            this.checklistItemElement.remove()
            if(this.onRemove) this.onRemove()
        })

        newitem.setAttribute('data-order-id', orderID)
        labelEl.append(this.makeChecklistLabel(order));

        return newitem;
    }

    getChecklistItemInput (checklistItem) {
        return checklistItem.firstElementChild;
    }

    getChecklistItemLabel (checklistItem) {
        return checklistItem.firstElementChild.nextElementSibling;
    }

    makeChecklistItemElement() {
        let formGroup = document.createElement('div')
        formGroup.classList.add('checklist-item')
        // though we dont use the data-order-id attribute to access the checklist item,
        // its needed to test
        formGroup.setAttribute('data-order-id', '')

        let labelEl = document.createElement('label')
        labelEl.classList.add('checklist-item__label');

        let inputEl = document.createElement('input')
        inputEl.classList.add('checklist-item__checkbox');
        inputEl.setAttribute('type', 'checkbox')

        formGroup.append(inputEl);
        formGroup.append(labelEl);

        return formGroup
    }

    makeChecklistLabel(order){
        return `${order.get('size')} ${order.get('flavor')} ${order.get('order')}, (${order.get('email')}) [${order.get('caffeine')}x]`
    }

    editItem (element) {
        // if the checklist item is double-clicked, change its state to editing.
        // a double-click is two clicks within 500ms of each other.
        let editState = element.getAttribute(this.EDIT_STATE_ATTRIBUTE)

        if (editState === this.EDIT_STATES.INACTIVE) {
            this.inactiveStateToActive(element)
            // if the button hasnt been clicked again in the next 500ms, make it inactive
            window.setTimeout(() => this.activeTimeoutToInactive(element), 500)
        }
        else if (editState === this.EDIT_STATES.ACTIVE) {
            this.activeStateToEditing(element)
        }
    }

    inactiveStateToActive (element) {
        element.setAttribute(this.EDIT_STATE_ATTRIBUTE, this.EDIT_STATES.ACTIVE)
        element.classList.add('checklist-item--active')
    }

    activeTimeoutToInactive (element) {
        // this will be called in 500ms irrespective of if the button has already been pressed
        // for the second time. dont do anything if its been double-clicked
        if (element.getAttribute(this.EDIT_STATE_ATTRIBUTE) !== this.EDIT_STATES.ACTIVE) {
            return;
        }

        element.removeAttribute(this.EDIT_STATE_ATTRIBUTE)
        element.classList.remove('checklist-item--active')
    }

    activeStateToEditing (element) {
        debugger
        element.setAttribute(this.EDIT_STATE_ATTRIBUTE, this.EDIT_STATES.EDITING)
        element.classList.remove('checklist-item--active')
        element.classList.add('checklist-item--editing')
        element.querySelector('.checklist-item__checkbox').disabled = true;

        this.startEditingHandler(
            order => this.updateItem(order),
            () => this.editingStateToInactive(this.checklistItemElement)
        )
    }

    editingStateToInactive (element) {
        debugger
        element.removeAttribute(this.EDIT_STATE_ATTRIBUTE)
        element.classList.remove('checklist-item--editing')
        element.querySelector('.checklist-item__checkbox').disabled = false;
    }

    updateItem (order) {
        let labelEl = this.getChecklistItemLabel(this.checklistItemElement)
        labelEl.textContent = this.makeChecklistLabel(order)
    }

    // callback for when this checklist item is being removed
    addRemoveHandler (onRemove) {
        this.onRemove = onRemove
    }

    addStartEditingHandler (startEditingHandler) {
        this.startEditingHandler = startEditingHandler
    }
}

export {
    Checklist,
    ChecklistItem
}
