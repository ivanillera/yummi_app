const { Schema, model } = require('mongoose')


const fileSchema = new Schema({
    filePath: String
},{
    timestamps: true
})


module.exports = model('File', fileSchema)