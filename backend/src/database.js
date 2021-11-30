// Conexión a base de datos
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const mongoURI = 'mongodb+srv://yummiadmin:1234@yummidb.rh4jc.mongodb.net/yummiDB?retryWrites=true&w=majority'

mongoose
    .connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
    
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