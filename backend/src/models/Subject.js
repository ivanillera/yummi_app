const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
    name: {type: String, required:true},
    professor: {type: String, required: true},
}, {
    timestamps: false,
    versionKey: false
});

module.exports = model('Subject', subjectSchema);