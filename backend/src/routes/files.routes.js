const { Router } = require('express')
const router = Router()

// CRUD o ABM
const filesCtrl = require('../controllers/files.controller.js')
// '/' es /api/users
router.get('/', filesCtrl.getFiles);
router.post('/', filesCtrl.createFile);
router.get('/:id', filesCtrl.getFiles);
router.put('/:id', filesCtrl.editFile);
router.delete('/:id', filesCtrl.deleteFile);


module.exports = router