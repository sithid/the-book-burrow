# To Do
  * implement bookshelfs - partially finished
    * bookshelfs are a collection of books, and each book can be in multiple bookshelfs - done
    * bookshelfs are stored in local storage via pinia-plugin-persistedstate - done
    * bookshelfs can be imported/exported as a base64 encoded string - not started
    * bookshelfs can be created, deleted, and renamed - partially finished
      * create bookshelf - done
      * delete bookshelf - done
      * combine bookshelfs - done
    * bookshelfs can have books added/removed from them - done
  * work on home view
  * work on about view
  * book result details view - partially finished
  * user preferences and data panel - partially finished
    * user preferences are stored in local storage via pinia-plugin-persistedstate - done
    * user preferences can be imported/exported as a base64 encoded string - not started
    * user preferences can be reset to default - not started
  * search functionality - partially finished
    * search by general terms - done
    * search by title, author, publisher, subject - done
    * search by ISBN: https://www.googleapis.com/books/v1/volumes?q=isbn:9781781100486
    * filter by language - done
  * clean up code
    * remove comments
      * most of the comments were added as I developed to help remember why or what I was doing
      * some comments are still relevant, but most of them are not
    * remove unused imports


  
# Data Persistence
  Saving, Loading, Importing, and Exporting Data: Implement import/export of user data (bookshelfs) and preferences.  User data will 
  persist on the local machine via local storage but if they use a different device they are not going to want to rebuild their bookshelfs.
  Google Books API provides a means of using 0Auth to access user bookshelf data but I dont want data imported from google books api, I just
  want the search responses.  Beyond local storage, one option is an import/export system that stringifys the json object, and then base64 encodes it and outputs the base64 encoding to the user who can then import it on a different device. I do not want to roll my own api, even if its a basic
  express server api. - Partially Started, wont be done for the deadline.  Planned future feature.

# To Remember
  Custom objects require custom logic for serialization and deserialization, but its entirely worth setting up the persist object.  Once its set up, its magically delious. Utility functions are a great way to keep the code clean and separate concerns.  I can use utility functions to convert between Bookshelf and GoogleBook instances and plain objects, which reminds me of DTO patterns from when I took the software development pathway with Code:You and had to convert between DTOs to pass information between the server and client.  This is a great way to keep the code clean and maintainable, and it allows me to easily serialize and deserialize the data when saving/loading from local storage.


# DISCOVERY

OMG I found out google books api lets you page requests.  I can set a start index, and a max results, and it will let me get more than 40 results.
I can use a for loop, loop 10 cycles each time changing the tail end of the url so that it reflects `&startIndex=0`, `&startIndex=40`, `&startIndex=80`
etc etc etc. Flippin magical.  I need to remember to implement proper paged results for the end user, scrolling down 400 results is absolutely AWFUL.
I need to go back and recode how im doing the search and then add another setting could maxPages and allow users to set the preference for max pages and the max results property will represent max results per page.  Ya ya this will work great.

# Notes

The more I work with Vue the more I love it.  Vue 3 Componsistion API functions in a way that just works with my brain.  It's not overly complicated, I can break whatever I want down into separate components so I can separate concerns cleanly and clearly.  Localstorage is made trivial via pinia-plugin-persistedstate or whatever it's name was.  As long as you serialize/deserialize, whats going on, its extremely easy.

