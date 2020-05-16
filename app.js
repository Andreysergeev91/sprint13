const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const cards = require('./routes/cards');

const users = require('./routes/users');


const {
  PORT = 3000,
} = process.env;


const app = express();


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.use('/', cards);
app.use('/', users);

app.get('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
});


app.listen(PORT);
