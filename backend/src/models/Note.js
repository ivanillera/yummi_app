const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
    name: {type: String, required:true},
    subject: {type: String, required: true},
    career: {type: String, required:true},
    creator: {type: Schema.ObjectId, ref:'User', required: true},
    content: {type: String, required: false},
    calification: {type: Number, required: false},
    attached: {type: String, required: false}, // Contenido de apunte: Adjuntar archivo.
    category: {type: String, required: true},
    comments: {type: [Schema.OjectId], ref:'Comment', required: false}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Note', noteSchema)