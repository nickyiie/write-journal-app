require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8080;
const entriesRoute = require('./routes/entries');
const usersRoute = require('./routes/users');
const todosRoute = require('./routes/todos');
const quotesRoute = require('./routes/quotes')

const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/entries', entriesRoute);
app.use('/users', usersRoute);
app.use('/todos', todosRoute);
app.use('/quotes', quotesRoute)


app.listen(PORT, () => console.log(`Listening on ${PORT}`));