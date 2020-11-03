'use strict';

require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const PORT = 3000;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gammadigital.rxvwy.mongodb.net/gamma?retryWrites=true&w=majority`;

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server"); 
  client.close();
});

app.get('/', (req, res) => {
  res.send('connected');
});

app.listen(PORT);