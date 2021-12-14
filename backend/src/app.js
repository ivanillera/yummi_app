const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();


//TODO MEJORAR ESTO --------

const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const mongoURI = 'mongodb+srv://yummiadmin:1234@yummidb.rh4jc.mongodb.net/yummiDB?retryWrites=true&w=majority'

//TODO MEJORAR ESTO --------

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

var conn = mongoose.createConnection(mongoURI);
    conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    })
    
    const storage = new GridFsStorage({
        url: mongoURI,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
              };
              resolve(fileInfo);
            });
          });
        }
      });

      const upload = multer({ storage });

//TODO - MEJORAR ESTO

      app.post('/upload', upload.single('attached'), (req, res) => {
        res.json({file: req.file});
      })

      app.use(function(req,res,next) {
        JWT.verify(req.cookies['token'], 'secretKey', function(err, decodedToken) {
          if(err) { /* handle token err */ }
          else {
           req.userId = decodedToken.id;   // Add to req object
           next();
          }
        });
       });
       