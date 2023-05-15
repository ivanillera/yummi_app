
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required:true},
    mail: {type: String, required:true},
    password: {type: String, required: true},
    legajo: {type: Number, required: true},
    notes: {type: Schema.ObjectId, ref:'Note', required: false} // Contiene el hilo de apuntes creados
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('User', userSchema);


