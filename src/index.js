const app = require('./app')

// HOLA
app.listen(app.get('port'));
console.log('Server on port', app.get('port'));