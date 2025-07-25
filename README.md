# The Book Burrow

The book burrow is a responsive web app that functions much like Google Books, utilizing the google books api.  Users can search for books by either
using the minimal serach box on the home page to do a broad search for books that have ANY properties which contain the keywords they are search for.

For example, if you do a minimal (basic) search for the the terms 'harry potter', it will send out a fetch query to the google books api for ANY book
that has any fields that contain any of these keywords.  This is a very broad search and the response is not very refinded.

Users can also do an more advanced search but opening up the filters panel from the search page and enter keywords into one of the various fields.

The first group, Find Results, are inputs for broad searches (meaning, any field that has values that match, or in some cases do not match, these terms ).
The second group, Filter Options, allows you to filter by various criteria (title, author, publisher, subject).  When filtering by 'subject' please remember
that subject is essentially genre or categorie.  This is the closest you will get to filter by genre/category but isnt really exact. You will need to play around
with various combinations of input options to hlep refine searches.

Additionally, users have what are called Bookshelfs.  These bookshelfs allow users to organize and save different collections of books.  Default options include 'To Be Read', 'Read', 'Owned', and 'To Be Owned'.  An option for custom bookshelfs is planned and should be implemented by the capstone due date.

Users will also be able to save user preferences. There is no login required(or available for that matter), all usage is anonymous. All data intended to persist across multiple sessions
and refresh will be stored using local storage. I am planning an export data feature, that will allow a user to export the json for their data (user preferences, bookshelfs) so they can import
it on a different device and not have to build their bookshelfs all over again.

## Tech Used

HTML, CSS, Javascript, Vu3

I am using Vue3 Composition API with Pinia Stores and local storage to facilitate both reactivity and data persistence.  I manage my local storage data with pinia and a plugin for pinia called
pinia-plugin-persistedstate and its absolutely wonderful. I'm not sure how the plugin works under the hood specifically but once you set up the persist object, which contains a serializer object with serialize (save the current state of the pinia store) and deserialize (load the saved state of the store, custom objects require mapping) functions.

## Run/Install:

1. clone repo.
2. navigate to the repo directory.
3. navigate to the book-burrow directory ~/the-book-burrow/book-burrow.
4. run npm install from the command line.
   `. create .env file with a single line 'VITE_API_KEY="GOOGLE_BOOKS_API_KEY"'
5. run npm run dev to start the development build
6. run npm run build for production dist.

I will be providing an API key to the tester/reviewers who need one. 

## Web Development Project Requirements

* Responsive Design: 
  * Implement responsive design using media queries, CSS Grid, Flexbox, etc. [&#x2713;]
  * Your application should adapt to at least two screen sizes (mobile and desktop). [&#x2713;]
  * Integrate responsive design as a testament to your JavaScript, HTML, and CSS integration skills. [&#x2713;]
* Feature Implementation:
  * Integrate an API into your project (MANDATORY) . Using a Weather API will not count. [&#x2713;]
  * At least one media query to make your site responsive. [&#x2713;]
  * Choose at least 3 items from the first table. [&#x2713;]
    * You may substitute requirements from the first table with requirements from the second table. [&#x2713;]
  * Consider adding a 4th feature as a backup plan.
  * Failure to meet all requirements will result in incomplete status for the class.

## Web Development Capstone Features List

#### Choose at least three of the following

| Feature                                                                                                                                                                                | Difficulty        | Done    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| :---------------: | :-----: |
| Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.                                                                             | Easy              | &#x2713; (1) |
| Use a regular expression to validate user input and either prevent the invalid input or inform the user about it (in all cases prevent invalid input from being stored or saved).      | Easy              | |
| Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs. Basic math functions don’t count (e.g. addition, etc). | Easy              | |
| Visualize data in a user friendly way. (e.g. graph, chart, etc). This can include using libraries like ChartJS                                                                         | Easy/Intermediate | |
| Convert user input between two formats and display the result. (e.g. Fahrenheit to Celcius, kilograms to pounds, etc)                                                                  | Easy/Intermediate | |
| Calculate and display data based on an external factor (ex: get the current date, and display how many days remaining until some event)                                                | Intermediate      | |
| Persist data to an internal API and make the stored data accessible in your app. (including after reload/refresh). This can be achieved either by using local storage or building your own API that stores data into a JSON file.|Intermediate/Hard |&#x2713; (2)|
   
#### Can swap with items from section one:

| Feature                                                                                                                                                                                | Difficulty        | Done    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------: | :-----: |
| Create a node.js web server using a modern framework such as Express.js.                                                                                                               | Easy/Intermediate | |
| Interact with a SQLite database to store and retrieve information                                                                                                                      | Intermediate/Hard | |
| Implement modern interactive UI features (e.g. table/data sorting, autocomplete, drag-and-drop, calendar-date-picker, etc).                                                            | Intermediate      | |
| Develop your project using a common JavaScript framework such as React, Svelte, or Vue.                                                                                                | Intermediate/Hard | [&#x2713;] (3) |
| Create 3 or more unit tests for your application (and document how to run them)                                                                                                        | Intermediate/Hard | |

