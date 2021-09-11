const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
    name: {type: String, required:true},
    carrer: {type: String, required:true},
    creator: {type: Schema.ObjectId, ref:'User', required: true},
    subject: {type: Schema.ObjectId, ref:'Subject', required: true},
    content: {type: String, required: true},
    attached: {type: String, required: true} // Contenido de apunte: Adjuntar archivo.
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Note', noteSchema)