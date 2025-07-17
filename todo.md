# todo
  *  implement bookshelfs
  * tweak query urls, where possible, to improve on the relavence of the returned books.
  * book result details page
  * preferences option panel
  * implement import/export of settings and bookselfs.  options include loading/saving json files, or possibly
  an import/export system that stringifys the json object, and then base64 encodes it and outputs the base64 encoding to the user
  who can then import it on a different device.  I am not really interested it buildin a basic api for this.

# known issues:
  - if you use the advanced search after doing a basic search, when you click the search button it returns the correct
  books api response, but the results dont update (the book array build from the api response doesnt get updated properly ).


