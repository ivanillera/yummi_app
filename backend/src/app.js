const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();


app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/users", require('./routes/users.routes'));
app.use("/api/notes", require('./routes/notes.routes'));
app.use("/api/subjects", require('./routes/subjects.routes'));
app.use("/api/files", require('./routes/files.routes'));
app.use("/api/comments", require('./routes/comments.routes'));

module.exports = app;