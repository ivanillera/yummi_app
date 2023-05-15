const { Router } = require('express');
const router = Router();

// CRUD o ABM
const notesCtrl = require('../controllers/notes.controller.js');

router.get('/', notesCtrl.getNotes);
router.post('/', notesCtrl.createNote);
router.get('/:id', notesCtrl.getNote);
router.put('/:id', notesCtrl.editNote);
router.delete('/:id', notesCtrl.deleteNote);


module.exports = router;