const { Router } = require('express')
const router = Router()

// CRUD o ABM
const subjectsCtrl = require('../controllers/subjects.controller.js')
// '/' es /api/users
router.get('/', subjectsCtrl.getSubjects);
router.post('/', subjectsCtrl.createSubject);
router.get('/:id', subjectsCtrl.getSubjects);
router.put('/:id', subjectsCtrl.editSubject);
router.delete('/:id', subjectsCtrl.deleteSubject);


module.exports = router