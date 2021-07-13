const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./controllers');
const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

mongoose.connect(process.env.MONGOURI || "mongodb://localhost/workout",
{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.listen(PORT, () =>
{
    console.log('now listening on ' + PORT);
});