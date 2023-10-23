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

** Task 5 **

Prepare

Install and configure eslint-plugin-react-hooks (https://www.npmjs.com/package/eslint-plugin-react-hooks).
It will help you identify mistakes when using hooks.
Clone the backend repository (https://github.com/VarvaraZadnepriak/MoviesAPI.ReactJS).
Navigate to the cloned repository folder and run "npm install" to install dependencies.
Run "npm start" command to start the backend server. It will start on https://localhost:4000.
Open Swagger API docs: http://localhost:4000/api-docs.

Implement movie list page

Now it's time to wire our components up and build the real app.
Create a "MovieListPage" component. You will place all the markup and logic for the main page here.
Using useState hook define several states for the component:

- search query
- sort criterion
- active genre
- movie list (array)
- selected movie (default to undefined or null)
- others if necessary

Render components that you've previously built to create the movie list page. It should look similar to the design prototype (https://www.figma.com/file/fKGjrOqR6nJe6LYJopGCZ8/%5BCDP%5D-Home-Task-%E2%80%93-React-v1). 
Pixel-perfect design is not necessary, but overall composition and placement should look the same.
- Pass search query state to the SearchForm component. Modify the state when the search form is submitted.
- If selected movie is defined, instead of SearchForm render MovieDetails and pass the selected movie in props.
- Pass static genre list and an active genre to the GenreSelect component. Modify the active genre state when other genres are selected.
- Pass current sort criterion to SortControl. Modify sort criterion state when the user changes sorting.
- Render MovieTile for every movie in state. Pass movie info to the MovieTile. You can define a mock movie array for now, so that your array is not empty and you can test results. Handle click events on MovieTile and update the selected movie state when a movie is selected.

As a result of this step, you should have a movie list page, with all controls working but without backend integration.

Implement effects

By using useEffect hook and Fetch API or axios, implement the following effect:
When search query, sort criterion or active genre changes, make a request to the backend to get movies corresponding to the new parameters. On response, update movie list with response data. Don't forget to abort previous request in case the user quickly updates several parameters.
 All functionality of the app except forms should work now.

Write end-to-end tests

You've implemented a lot of functionality, composed several components to achieve a working piece of software. Now spend some time on covering this behavior with a reliable end-to-end test. Cover search functionality, sorting and switching genres, selecting a movie and returning back to search.

Materials: https://react-gmp.netlify.app/react-hooks/built-in-hooks

** Scripts used in task5 **

npm install eslint-plugin-react-hooks --save-dev
npx cypress run --headed
npm run test
npm run storybook
npm run start  

** Task 6 **

Install React Router

Open react-router tutorial in a separate browser tab. You will find it handy when doing this practical task.
Install react-router-dom and define the root route to render your MovieListPage component. Use "/" value for route path. This will not change the app behavior. It should still load and work as before. But it will enable you to make further changes.

Move search parameters to URL

Currently you have several occurrences of useState in your component. You keep track of current search query, selected genre, sorting.
All these parameters influence the list of movies to be displayed on the page. If you make changes and then refresh the page, all parameters will reset. Also, you can't share a link to specific search results with your friends. Let's fix it.

Change your component to read current search query, sorting and active genre from the URL by using the "useSearchParams" hook provided by React Router. Don't forget that params may not be specified. To handle this case, you need to default them to specific values when reading.

useSearchParams allows you to update search parameters similar to useState. Use this functionality to update URL every time the user updates search query, sorting or active genre. This way when you search movies, your URL search params will look something like "?query=abc". Similarly, when you specify sorting, it will add another parameter to the search part of the URL.

At the end of this step your search query, sorting and active genre state should be stored in URL. If you refresh the page, it shouldn't reset the state. And once you deploy your app somewhere, you will be able to share more specific URLs with your friends.

Cover this new functionality with end-to-end tests.

Define a route for movie details

Currently selected movie state is still handled internally by your MovieListPage component. When you select a movie and then refresh the page, the selected movie won't be preserved. And you can't share a link to a specific movie with your friends. Let's fix it.

Open the Nested Routes section of the tutorial. In your MovieListComponent instead of rendering either SearchForm or MovieDetails components based on component state, render <Outlet /> component from React Router. This will temporary remove the possibility to search for movies. Don't worry, we will bring it back in a moment.

In your root route define two child routes:

- The first one should have the same path as your root route: "/". It should render SearchForm component.
- The second one should add a new dynamic path segment with movie id: "/:movieId". And it should render MovieDetails component.

Here you may need to wrap your MovieDetails with another component, because the router will now give you just a movie ID and you will be responsible for loading the movie from the backend API and rendering the result.

This way when your URL pathname is just "/", the app will render SearchForm at the top and the list of movies at the bottom. And when your URL pathname is "/:movieId", it will render movie details on top and the list of movies at the bottom of the page.

Use a route loader  or useParams hook from React Router to load movie details. Route loader is more preferred, because it is optimized to load and cache your data before your component is rendered.

Update your logic to select a movie. When a movie card is clicked, navigate the user to "/:movieId" route. We recommend to preserve current search params upon navigation, so that your movie list is not reset.

Now you should be able to select a movie, refresh the page and still see the movie selected. Also, once you deploy your app somewhere, you will be able to share a link to a specific movie with your friends. Update your end-to-end tests to cover the newly written logic.

Here's the complete description of desired behavior:

- Navigating to "/" displays a search form and a list of movies.
- Entering a search query and submitting the search form, the URL updates with "query" search parameter containing the entered search query. The movie list is refreshed to reflect the entered search query.
- Navigating to "/?query=abc" displays a search form with entered text "abc" and a movie list relevant to the search query.
- Selecting a genre updates the URL with "genre" search parameter containing the selected genre. The movie list is refreshed to display movies of the selected genre.
- Navigating to "/?genre=comedy" displays "Comedy" genre as selected and movies of comedy genre.
- Selecting sorting by title updates the URL with "sortBy" search parameter with the respective value. The movie list is refreshed to display movies sorted by title.
- Navigating to "/?sortBy=title" displays the list of movies sorted by title.
- Navigating to "/?query=abc&genre=comedy&sortBy=title" displays the search form with entered value "abc", sort select has "Title" value and the movie list displays movies relevant to these search params.
- Clicking on a movie from the list changes URL pathname to "/:movieId", where :movieId is the ID of the selected movie. If the URL contained query parameters (query, sortBy, genre), they are preserved after navigating. The movie list stays the same.
- Navigating to "/:movieId" where :movieId is a random valid movie ID, the page displays movie details on top and a list of movies on the bottom of the page.

** Scripts used in task6 **

npm install react-router-dom --save --legacy-peer-deps
npm run storybook
npm run start
npx cypress run --headed


