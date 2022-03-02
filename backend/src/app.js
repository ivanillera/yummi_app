const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

const path = require('path');
const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://yummi:yummi@cluster0.jpx40.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const ejs = require('ejs');



// Env Var.
app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/users", require('./routes/users.routes'));
app.use("/api/notes", require('./routes/notes.routes'));
app.use("/api/subjects", require('./routes/subjects.routes'));
app.use("/api/comments", require('./routes/comments.routes'));

//Heroku link public dist
app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



module.exports = app;