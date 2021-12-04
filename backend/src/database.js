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
    
    