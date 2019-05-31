const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', indexController.index);
app.get('/users', usersController.all);
app.get('/users/:id', usersController.view);
app.post('/users', usersController.create);
app.put('/users/:id', usersController.update);
app.delete('/users/:id', usersController.delete);


db.connect('mongodb://localhost:27017/api', function (err) {
    if (err)
        return console.log(err);
    app.listen(3000, function () {
        console.log('Server was running!');
    });
});


