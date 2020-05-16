const usersRouter = require('express').Router();

const fsPromises = require('fs').promises;

const path = require('path');

const usersPath = path.join('data', 'users.json');

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500);
      res.send(err.message);
    });
});

usersRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;

  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      if (!(JSON.parse(data).some((item) => item._id === id))) {
        res.send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(JSON.parse(data).find((item) => item._id === id));
    })
    .catch((err) => {
      res.status(500);
      res.send(err.message);
    });
});

module.exports = usersRouter;
