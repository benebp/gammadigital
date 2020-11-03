'use strict';

require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gammadigital.rxvwy.mongodb.net/gamma_db?retryWrites=true&w=majority`;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('gamma_db')
    const collection = db.collection('letters')
    app.get('/records', (req, res) => {
      collection.find().toArray()
      .then(result => {
        res.send(result);
      })
      .catch(error => console.error(error))
    })
    app.get('/records/:id', (req, res) => {
      const searchedRecordId = req.params.id;
      collection.find({'id': searchedRecordId}).toArray()
      .then(result => {
        if (result.length === 0) {
          res.send('No record found by given ID')
        } else {
          res.send(result[0]);
        }
      })
      .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error));

app.get('/', (req, res) => {
  res.send('connected');
});

app.listen(PORT);