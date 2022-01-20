const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
    name: {type: String, required:true},
    subject: {type: Schema.ObjectId, ref:'Subject', required: false},
    career: {type: String, required:true},
    creator: {type: Schema.ObjectId, ref:'User', required: true},
    body: {type: String, required: false},
    calification: {type: Number, required: false},
    file: {type: String, required: false}, // Contenido de apunte: Adjuntar archivo.
    category: {type: String(), required: false},
    comments: {type: String(), required: false}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Note', noteSchema)