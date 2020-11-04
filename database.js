'use strict';

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.DB_URL;

const getDatabase = () => {
  return MongoClient.connect(dbUrl, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected to Database');
      return client
    }
  )};

module.exports = getDatabase();