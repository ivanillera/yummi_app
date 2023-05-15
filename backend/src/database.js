// Conexión a base de datos
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://yummi:yummi@cluster0.jpx40.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
    .connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB is connected'))
    .catch(err => console.error(err));

