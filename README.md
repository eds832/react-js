**Task1**

Create components
To understand more how components work it's recommended to create a few interactive components.

Create the followong three components and render them all on one page, so that you can play around with them and test their look and behavior.

Counter

A component that renders a numeric value and two buttons: one to decrement the value by 1, another to increment the value by 1.
The component should take an initial value in a property.
The component should be written using EcmaScript classes syntax, the `render` method should use `React.createElement` API (without JSX).

SearchForm

Refer to the design prototype, implement a component that renders a search input and a button that triggers a new search.
The component should accept two properties:

Initial search query. Use the value to set the initial value for the input
A "onSearch" callback property. Call the callback property every time the user presses Enter when the input has focus or when the user clicks the Search button. Pass current input value in callback arguments.

GenreSelect

Refer to the design prototype, implement a component that renders a list of movie genres with currently selected genre highlighted.
The component should accept three properties:

A list of genre names to display. Use the incoming list to render genre buttons.
A name of currently selected genre. Use the name to identify which button to highlight.
A "onSelect" callback property. Call the callback function when the user clicks on any genre button. Pass respective genre name to the callback arguments.

**Task2**

Unit and component testing
Check that you have jest and @testing-library/react packages installed for unit and component tests.
If you haven't created all components from the previous module, finish them now. Cover the logic for all three with tests using these libraries.
Counter
Test that component renders initial value provided in props
Test that a click event on "decrement" button decrements the displayed value
Test that a click event on "increment" button increments the displayed value

SearchForm
Test that component renders an input with the value equal to initial value passed in props
Test that after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value
Test that after typing to the input and pressing Enter key, the "onChange" prop is called with proper value

GenreSelect
Test that component renders all genres passed in props
Test that component highlights a selected genre passed in props
Test that after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments

End-to-End Testing
Install and setup Cypress or WebdriverIO for end-to-end tests.
Cover the logic for one of your components using the framework.

**Scripts used in the task**

npm install --save-dev @testing-library/user-event @testing-library/dom
npm install cypress --save-dev
npm install eslint-plugin-cypress@latest --save-dev
To open cypress: npx cypress open
To run cypress tests: npx cypress run
To run cypress testes with opening a browser: npx cypress run --headed
To run cypress testes with a spec: npx cypress run --spec cypress/e2e/Counter/Counter.cy.js
To run cypress testes with a browser: npx cypress run --browser chrome