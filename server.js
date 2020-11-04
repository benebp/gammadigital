'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
const dbUrl = process.env.DB_URL;

MongoClient.connect(dbUrl, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const gammaDb = client.db('gamma_db');
    const recordCollection = gammaDb.collection('records');
    app.get('/records', (req, res) => {
      recordCollection.find().toArray()
        .then(result => {
          if (result.length === 0) {
            res.send({ status : 'No saved records' });
          } else {
            res.send(result);
          };
        })
        .catch(error => console.error(error));
    });
    app.get('/records/:id', (req, res) => {
      recordCollection.find({'id': req.params.id}).toArray()
        .then(result => {
          if (result.length === 0) {
            res.send({ error: 'No record found by given ID' });
          } else {
            res.send(result[0]);
          };
        })
        .catch(error => console.error(error));
    });
    app.post('/records', (req, res) => {
      if (!req.body.id) {
        res.send({ error: 'No ID given' });
      } else {
        recordCollection.find({'id': req.body.id}).toArray()
          .then(result => {
            if (result.length !== 0) {
              res.send({ error: 'Given ID already exists' });
            } else {
              recordCollection.insertOne(req.body);
              res.send({ status: 'Created' });
            };
          })
          .catch(error => console.error(error));
      }
    });
    app.delete('/records/:id', (req, res) => {
      recordCollection.findOneAndDelete({'id': req.params.id})
        .then(result => {
          if (!result.value) {
            res.send({ error: 'No record found by given ID' });
          } else {
            res.send(result.value);
          };
        })
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error));

app.get('/', (req, res) => {
  res.redirect('/records');
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});