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

