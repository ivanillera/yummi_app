const { Schema, model } = require('mongoose')


const fileSchema = new Schema({
    url: {type: String, required: true}
},{
    timestamps: true,
    versionKey: false
})
// const fileSchema = new Schema({
//     name: {type: String, required:true},
//     subject: {type: Schema.ObjectId, ref:'Subject', required: true},
//     career: {type: String, required:true},
//     creator: {type: Schema.ObjectId, ref:'User', required: true},
//     content: {type: String, required: true},
//     calification: {type: Number, required: true},
//     attached: {type: String, required: true}, // Contenido de apunte: Adjuntar archivo.
//     category: {type: String, required:true}
// },{
//     timestamps: true,
//     versionKey: false
// })

module.exports = model('File', fileSchema)