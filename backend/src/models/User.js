
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required:true},
    notes: {type: Schema.ObjectId, ref:'Note', required: false} // Contiene el hilo de apuntes creados
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)



