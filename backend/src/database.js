// Conexión a base de datos
const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://yummiadmin:1234@yummidb.rh4jc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));