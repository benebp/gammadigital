Gamma records app by benebp

Installation
  - git and node has to be installed on your system
  - clone this repository with git
  - run npm install
  - create .env file with url for database connection
  - run node server.js

Manual
  - the app can store records by given unique IDs
  - localhost:3000 (which redirects to /records) shows all the stored records
  - /records/:id shows the record of the given ID
  - saving a new record requires a post request to /records, with at least an ID in the body in JSON format
  - deleting a record requeries a delete request to /records/:id with the ID of the record we want to delete

API documentation

  /records
    - shows all the stored records in the database
    - HTTP method: GET
  
  /records/
    - shows the stored record of the given ID
    - HTTP method: GET
    - parameter is required

  /records
    - saves a new record with the given ID
    - HTTP method: POST
    - ID required in payload with optional other contents
    - sample payload:
        { "id": "256", "record": "quarter" }

  /records/
    - deletes the stored record of the given ID
    - HTTP method: DELETE
    - parameter is required