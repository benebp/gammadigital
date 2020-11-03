'use strict';

const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('connected');
});

app.listen(PORT);