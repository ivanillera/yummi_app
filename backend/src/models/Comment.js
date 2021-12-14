const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    creator: {type: Schema.ObjectId, ref:'User', required: false},
    content: {type: String, required: true},
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Comment', commentSchema)