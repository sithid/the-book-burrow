# The Book Burrow Overview  

The book burrow is a responsive web app that functions much like Google Books, utilizing the google books api. Users can search for books by either
using the minimal serach box on the home page to do a broad search for books that have ANY properties which contain the keywords they are search for.

For example, if you do a minimal (basic) search for the the terms 'harry potter', it will send out a fetch query to the google books api for ANY book
that has any fields that contain any of these keywords. This is a very broad search and the response is not very refinded.

Users can also do an more advanced search but opening up the filters panel from the search page and enter keywords into one of the various fields.

The first group, Find Results, are inputs for broad searches (meaning, any field that has values that match, or in some cases do not match, these terms ). The second group, Filter By, allows you to filter by title, author, subject, and publisher. Author and publisher are fairly basic and you usually wont want to enter multiple authors but you should be able to just fine. The title option will separate the terms into individual words and add each to the url (intitle:harry+intitle:potter). When filtering by 'subject' please remember that subject is NOT a direct translation of genre, it's listed as category from the google books API. You will need to try various options. Subjects should be separated by semicolons and each 'word' created from splitting the input by semicolon will be added to the url (subject:"young adult"+subject:"science fiction"). Subject is NOT a direct translation of genre, it's listed as category from the google books API. You will need to try various options.

Additionally, users have what are called Bookshelfs. These bookshelfs allow users to organize and save different collections of books. Default options include 'To Be Read', 'Already Read', 'Already Owned', and 'To Be Owned'. An option for custom bookshelfs is planned and should be implemented by the capstone due date.

Users will also be able to save user preferences. There is no login required(or available for that matter), all usage is anonymous. All data intended to persist across multiple sessions
and refresh will be stored using local storage. I am planning an export data feature, that will allow a user to export the json for their data (user preferences, bookshelfs) so they can import
it on a different device and not have to build their bookshelfs all over again.

## Tech Used  

HTML, CSS, Javascript, Vu3

I am using Vue3 Composition API with Pinia Stores and local storage to facilitate both reactivity and data persistence. I manage my local storage data with pinia and a plugin for pinia called
pinia-plugin-persistedstate and its absolutely wonderful. I'm not sure how the plugin works under the hood specifically but once you set up the persist object, which contains a serializer object with serialize (save the current state of the pinia store) and deserialize (load the saved state of the store, custom objects require mapping) functions.

# Images  

Webapp artwork is provided by [Unsplash](https://unsplash.com/). All images are free to use under the Unsplash License.

## Run/Install:  

1. **Clone the repository**  
   Navigate to the directory where you want to clone the repository and run the following commands:

   ```bash
   git clone https://github.com/sithid/the-book-burrow.git
   cd the-book-burrow/book-burrow
   ```
2. **Install dependencies**  
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install the necessary dependencies:  
   ```bash
   npm install
   ```
3. **Set up environment variables**  
   Next, create a `.env` file in the root of the project directory and add your API keys. You can use the following commands to create the file and add the keys:
   ```bash
   echo "VITE_GOOGLE_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY_HERE" > .env
   echo "VITE_NYT_API_KEY=YOUR_NYT_API_KEY_HERE" >> .env
   ```

   I will be providing API keys to the testers/reviewers who need them. If you are testing this project, please contact me for the API keys.  If you are a tester/reviewer, please
   do not share the API keys with anyone else. The keys are provided for testing purposes only and should not be used in production environments.  When testing, you are free to
   test but please do not spam the 'view full results' button on the home page. The google books API has a limit of 1000 requests per day and I do not want to hit that limit while testing.
   Until I can change the way the book information is stored from the NYT lists, whenever you view all results, it sends a request to the google books api for EACH book in the list. This is not ideal and I will be changing this in the future but may not have time before the deadline. 
4. **Run the development server**  
   To start the development server, run the following command:
   ```bash
   npm run dev
   ```
5. **Build for production**  
   If you want to build the project for production, run the following command:
   ```bash
   npm run build
   ```
6. **Open the application**  
   Open your web browser and navigate to `http://localhost:5173` to view the application.
7. **Debug Output**  
   You can enable/disable debug output to the console by changing config.DEBUG from `./src/config.js`.
   ```js
   export const config = {
     DEBUG: true,
   ...
   }
   ```

## Web Development Project Requirements

- Responsive Design:
  - Implement responsive design using media queries, CSS Grid, Flexbox, etc. [&#x2713;]
  - Your application should adapt to at least two screen sizes (mobile and desktop). [&#x2713;]
  - Integrate responsive design as a testament to your JavaScript, HTML, and CSS integration skills. [&#x2713;]
- Feature Implementation:
  - Integrate an API into your project (MANDATORY) . Using a Weather API will not count. [&#x2713;]
  - At least one media query to make your site responsive. [&#x2713;]
  - Choose at least 3 items from the first table. [&#x2713;]
    - You may substitute requirements from the first table with requirements from the second table. [&#x2713;]
  - Consider adding a 4th feature as a backup plan.
  - Failure to meet all requirements will result in incomplete status for the class.

## Web Development Capstone Features List

#### Choose at least three of the following

|                                                                                                              Feature                                                                                                              |    Difficulty     |     Done     |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------: | :----------: |
|                                                            Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.                                                             |       Easy        | &#x2713; (1) |
|                         Use a regular expression to validate user input and either prevent the invalid input or inform the user about it (in all cases prevent invalid input from being stored or saved).                         |       Easy        | &#x2713; (2) |
|                      Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs. Basic math functions don’t count (e.g. addition, etc).                       |       Easy        | &#x2713; (3) |
|                                                          Visualize data in a user friendly way. (e.g. graph, chart, etc). This can include using libraries like ChartJS                                                           | Easy/Intermediate |              |
|                                                       Convert user input between two formats and display the result. (e.g. Fahrenheit to Celcius, kilograms to pounds, etc)                                                       | Easy/Intermediate |              |
|                                              Calculate and display data based on an external factor (ex: get the current date, and display how many days remaining until some event)                                              |   Intermediate    |              |
| Persist data to an internal API and make the stored data accessible in your app. (including after reload/refresh). This can be achieved either by using local storage or building your own API that stores data into a JSON file. | Intermediate/Hard | &#x2713; (4) |

#### Can swap with items from section one:

| Feature                                                                                                                     |    Difficulty     |      Done      |
| :-------------------------------------------------------------------------------------------------------------------------- | :---------------: | :------------: |
| Create a node.js web server using a modern framework such as Express.js.                                                    | Easy/Intermediate |                |
| Interact with a SQLite database to store and retrieve information                                                           | Intermediate/Hard |                |
| Implement modern interactive UI features (e.g. table/data sorting, autocomplete, drag-and-drop, calendar-date-picker, etc). |   Intermediate    |                |
| Develop your project using a common JavaScript framework such as React, Svelte, or Vue.                                     | Intermediate/Hard | [&#x2713;] (5) |
| Create 3 or more unit tests for your application (and document how to run them)                                             | Intermediate/Hard |                |

### Create a function...

```javascript
/*
   * Feature: Create a function that accepts two or more input parameters and
   * returns a value that is calculated or determined by the inputs.
   *
   * getCombinedBookshelfs: Combine two bookshelves into a new, single, bookshelf.
   * This function takes two Bookshelf instances and combines their books into a new Bookshelf instance.
   * It also allows for custom naming and description of the new bookshelf.
   * If no name is supplied, it defaults to a combination of the two bookshelves' names.
   * If no description is supplied, it defaults to a combination of the two bookshelves' descriptions.
   *
   * This will allow me to have simple buttons for combining bookshelves into custom bookshelves within the ui
   * without having to repeat this code in multiple places.
   */
  getCombinedBookshelfs(
    bookshelf1,
    bookshelf2,
    newBookshelfName = `${bookshelf1.name} & ${bookshelf2.name}`,
    newBookshelfDescription = `${bookshelf1.description} & ${bookshelf2.description}`
  ) {
    if (!bookshelf1 || !bookshelf2) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::getCombinedBookshelfs",
        "One or both bookshelves are undefined.",
        true
      );
      return false;
    }

    const combinedBooks = [...bookshelf1.books, ...bookshelf2.books];

    if (combinedBooks.length === 0) {
      return new Bookshelf(
        newBookshelfName,
        newBookshelfDescription,
        false,
        uuidv4(),
        combinedBooks
      );
    }
  }
```

### Use Regesular Expression

```javascript
/*
 * ./stores/filter.js
 * Feature: Use a regular expression to validate user input and either prevent the invalid input or inform the user about it.
 * This function validates an ISBN number, allowing both 10-digit and 13-digit formats.
 */
 const isValidISBN = (value) => {
  const cleanedValue = value.replace(/[- ]/g, "");
  return /^\d{10}$|^\d{13}$/.test(cleanedValue);
 };
```
