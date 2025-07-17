# todo
  *  implement bookshelfs
  * tweak query urls, where possible, to improve on the relavence of the returned books.
  * book result details page
  * preferences option panel
  * Saving, Loading, Importing, and Exporting Data: Implement import/export of user data (bookshelfs) and preferences.  User data will 
  persist on the local machine via local storage but if they use a different device they are not going to want to rebuild their bookshelfs.
  Google Books API provides a means of using 0Auth to access user bookshelf data but I dont want data imported from google books api, I just
  want the search responses.  Beyond local storage, one option is an import/export system that stringifys the json object, and then base64 encodes it and outputs the base64 encoding to the user who can then import it on a different device.  I am not really interested it buildin a basic api for this.

# known issues:
  - if you use the advanced search after doing a basic search, when you click the search button it returns the correct
  books api response, but the results dont update (the book array build from the api response doesnt get updated properly ).


