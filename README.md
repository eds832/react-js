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

** Task 3 **

https://react-gmp.netlify.app/react-components/components/

Install Storybook: https://storybook.js.org/docs/react/get-started/install

Install and configure Storybook by following guide from the official website.
In the end you should have a "storybook" npm script. When running "npm run storybook" it should start Storybook and open it in your browser.
Write Storybook stories for existing components
Create a story file for every component you created in previous modules. You should have at least one story for each of the following components (in total minimum 3):

Counter
SearchForm
GenreSelect

You can write more stories to cover several states of GenreSelect or SearchForm, but this is optional.

Implement other components
Based on Figma prototype implement the following components:

MovieTile

This component should render a movie tile from the list of movies.
It should take properties to receive image url, movie name, release year, and a list of relevant genres. Alternatively, you can define one component property to take an object with all movie info. Additionally, the component should receive a callback property to capture click event.
Optionally, you can implement a context menu popup that opens when a user clicks on three dots button and contains "Edit" and "Delete" menu items.


MovieDetails

This component will render movie details when a movie is selected from the list (clicked). The details include movie poster image on the left and the rest of info on the right.
The component should take properties to receive image url, movie name, release year, rating, duration and a description. Alternatively,  you can specify a single property that accepts an object with all movie info.


SortControl

This component will render a label "Sort by" and a select control to the right. Select should have the following options:
Release Date
Title

The component should take a property that specifies current selection. Additionally, it should take a callback property to handle selection changes. The callback should be called every time a user changes "Sort by" value. The new value should be passed in callback arguments.
Use Storybook when implementing every individual component. Write a story for every component you create. It will help you to check the result and play around with some interactivity before you embed components into the app.

Although, it's not required to implement high-fidelity design as per design prototype, it still makes sense to apply some styling to your components, so that you practice in styling React components and your final result looks good.

Write tests
Cover new components with tests using jest and @testing-library/react. Verify necessary data is rendered as well as that behavior works correctly. You can write snapshot tests to cover the rendering. Although, remember that snapshot tests are fragile and will fail any time you change your component markup.

** Scripts used in task 3 **

install storybook: npx storybook@latest init
run storybook: npm run storybook

** Task 4 **

Implement new components

Implement the following new components. Use Storybook to manually verify your components look and behavior during development. Remember to cover these new components with tests.


Dialog

The component should render a modal dialog with custom content. It should use the Portals functionality.
You can install and use react-portal npm package. Additionally, you can also install focus-trap-react package for better UX.
Use Figma prototype to get inspiration about the visual design.
The Dialog component should accept the following props:
a string or JSX for title
JSX for body content in "children" property
a callback function for handling clicks on close button (×) in the header



MovieForm

The component should render a form element with form controls to add or edit a movie.
Use Add movie and Edit dialogs to get inspiration about form layout and inputs.
The MovieForm component should accept the following props:
an optional object for initial movie info. Later, when we will implement "add movie" use case, we will not pass this property
a callback function for handling form submit

To handle form events we recommend you to render HTML <form> element and add "onSubmit" event handler to it.
This will keep inputs uncontrolled, which will dramatically simplify the logic of handling form state.

You can collect form state on submit by using `Object.fromEntries(new FormData(event.target))`

Apply composition

Having implemented above components, now you can compose them to implement the following use cases. Write new Storybook stories to showcase them.
Add movie. Render Dialog and put a MovieForm inside without passing initial movie info. This should render a dialog with the empty movie form.
Edit movie. Render Dialog and put a MovieForm inside, pass some dumb data for initial movie info. This should render a dialog with prefilled form fields.
Delete movie. Render Dialog with content from "delete movie" modal from Figma prototype.


** Scrips used in the task 4 **

npm install focus-trap-react
npm install react-portal
npm i --save-dev @types/react-portal