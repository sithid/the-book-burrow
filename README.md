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

Run/Install: 

1. clone repo.
2. navigate to the repo directory.
3. navigate to the book-burrow directory ~/the-book-burrow/book-burrow.
4. run npm install from the command line.
5. create .env file with a single line 'VITE_API_KEY="GOOGLE_BOOKS_API_KEY"'
5. run npm run dev to start the development build
6. run npm run build for production dist.

I will be providing an API key to the tester/reviewers who need one.

Tech Used

HTML, CSS, Javascript, Vu3

I am using Vue3 Composition API with Pinia Stores and local storage to facilitate both reactivity and data persistence.  I manage my local storage data with pinia and a plugin for pinia called
pinia-plugin-persistedstate and its absolutely wonderful. I'm not sure how the plugin works under the hood specifically but once you set up the persist object, which contains a serializer object with serialize (save the current state of the pinia store) and deserialize (load the saved state of the store, custom objects require mapping) functions.