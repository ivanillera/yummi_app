const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
    name: {type: String, required:true},
    subject: {type: String, required: true},
    career: {type: String, required:true},
    creator: {type: String, required: true},
    body: {type: String, required: false},
    calification: {type: Number, required: false},
    file: {type: String, required: false}, // Contenido de apunte: Adjuntar archivo.
    category: {type: String, required:true},
    comments: {type: String(), required: false}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Note', noteSchema)