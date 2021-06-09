const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
    name: {type: String, required:true},
    creator: {type: String, required: true},
    content: {type: String, required: true} // Contenido de apunte: Adjuntar archivo.
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Note', noteSchema)