const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
    name: {type: String, required:true},
    subject: {type: Schema.ObjectId, ref:'Subject', required: true},
    career: {type: String, required:true},
    creator: {type: Schema.ObjectId, ref:'User', required: true},
    body: {type: String, required: true},
    calification: {type: Number, required: true},
    file: {type: String, required: true}, // Contenido de apunte: Adjuntar archivo.
    category: {type: String, required:true},
    comments: {type: Schema.ObjectId, ref:'Comment', required: true}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Note', noteSchema)