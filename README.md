# Coffee Store

This a simple webapp written using vanilla Javascript, HTML and CSS. It's
inspired by the CoffeeRun project in the [Big Nerd Ranch book Front-end Web
Development](https://www.bignerdranch.com/books/front-end-web-development-the-big-nerd-ranch-guide/).

Features:
    - Add orders by filling out the form. They will now show up as "Pending
      Orders".
    - Tick orders off to mark them as done. They will be removed from the list
      of pending orders.
    - Double-click an order to modify them. Modify an order and hit save to
      update the details of an order.
    - A "test data" button for if you're not feeling up for creating fake data
      to demo the app.
      
The order editing feature was interesting to implement without using a reactive
framework like Vue. Instead, this was done via boring callbacks: on each edit
you make, the order item is rebuilt.

I used:
    - BEM, the CSS methodology
    - Javscript ES6
    - Web APIs like the FormData and Constraint validation API
