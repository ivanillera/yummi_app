const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentCreator: {type: Schema.ObjectId, ref:'User', required: true},
    content: {type: String, required: true},
    date: {type: String, required: false}
},{
    timestamps: false,
    versionKey: false
});

module.exports = model('Comment', commentSchema);