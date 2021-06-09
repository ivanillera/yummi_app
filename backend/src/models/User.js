const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required:true},
    id: {type: String, required: true}, // Legajo
    notes: {type: [String], required: true} // Contiene el hilo de apuntes creadas
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)
