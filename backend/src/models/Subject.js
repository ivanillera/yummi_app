const { Schema, model } = require('mongoose')

const subjectSchema = new Schema({
    name: {type: String, required:true},
    professor: {type: String, required: true},
    notes: {type: [String], required: true} // Contiene el hilo de apuntes!
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Subject', subjectSchema)