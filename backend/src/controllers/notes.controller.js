const noteCtrl = {}

const Note = require('../models/Note')

noteCtrl.getNotes = async (req, res) => {
    const notes = await Note.find().populate('creator'); 
    res.json(notes)
}

noteCtrl.createNote = async (req, res) => {
    const newNote = new Note(req.body)
    await newNote.save()
    res.send({ message: 'Note created', note: newNote.toJSON() })
}


noteCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id).populate('creator');
    res.send(note)
}


noteCtrl.editNote = async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Note Updated'})
}

noteCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json({status: 'Note Deleted'})
}

module.exports = noteCtrl;