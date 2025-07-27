# To Do
  * implement bookshelfs
  * work on home view
  * work on about view
  * book result details view - partially finished
  * tweak query urls, where possible, to improve on the relavence of the returned books.
  * preferences option panel
  
# Data Persistence
  Saving, Loading, Importing, and Exporting Data: Implement import/export of user data (bookshelfs) and preferences.  User data will 
  persist on the local machine via local storage but if they use a different device they are not going to want to rebuild their bookshelfs.
  Google Books API provides a means of using 0Auth to access user bookshelf data but I dont want data imported from google books api, I just
  want the search responses.  Beyond local storage, one option is an import/export system that stringifys the json object, and then base64 encodes it and outputs the base64 encoding to the user who can then import it on a different device. I do not want to roll my own api, even if its a basic
  express server api.

# To Remember
  Custom objects require custom ser/deser handling in the stores for persistance to work right but its entirely worth setting up the persist object.
  Once its set up, its magically delious.


# DISCOVERY

OMG I found out google books api lets you page requests.  I can set a start index, and a max results, and it will let me get more than 40 results.
I can use a for loop, loop 10 cycles each time changing the tail end of the url so that it reflects `&startIndex=0`, `&startIndex=40`, `&startIndex=80`
etc etc etc. Flippin magical.  I need to remember to implement proper paged results for the end user, scrolling down 400 results is absolutely AWFUL.
I need to go back and recode how im doing the search and then add another setting could maxPages and allow users to set the preference for max pages and the max results property will represent max results per page.  Ya ya this will work great.

# Notes

The more I work with Vue the more I love it.  Vue 3 Componsistion API functions in a way that just works with my brain.  It's not overly complicated, I can break whatever I want down into separate components so I can separate concerns cleanly and clearly.  Localstorage is made trivial via pinia-plugin-persistedstate or whatever it's name was.  As long as you serialize/deserialize, whats going on, its extremely easy.

