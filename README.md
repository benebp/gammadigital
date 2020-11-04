Gamma records app by benebp

Installation
  - clone this repository
  - npm i
  - .env file with username and password for database connection
  - node server.js
  - app is running on localhost:3000

Manual
  - the app can store records by given unique IDs
  - localhost:3000 (which redirects to /records) shows all the stored records
  - /records/:id shows the record by that given ID
  - saving a new record requires a post request to /records, with at least an ID in the body in JSON format
  - deleting a record requeries a delete request to /records/:id with the ID of the record we want to delete