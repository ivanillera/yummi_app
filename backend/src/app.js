const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

const path = require('path');
const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://yummiadmin:1234@yummidb.rh4jc.mongodb.net/yummiDB?retryWrites=true&w=majority'
const ejs = require('ejs');




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
app.use("/api/files", require('./routes/files.routes'));
app.use("/api/comments", require('./routes/comments.routes'));
app.use(require('./routes/images.routes'));
//app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;

//TODO - MEJORAR ESTO
/*
      app.post('/upload', upload.single('attached'), (req, res) => {
        res.json({file: req.file});
      })

      app.use(function(req,res,next) {
        JWT.verify(req.cookies['token'], 'secretKey', function(err, decodedToken) {
          if(err) {}
          else {
           req.userId = decodedToken.id;   // Add to req object
           next();
          }
        });
       });
*/