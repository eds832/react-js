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
