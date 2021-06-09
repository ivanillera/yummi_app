const { Router } = require('express')
const router = Router()

// CRUD o ABM
const usersCtrl = require('../controllers/users.controller.js')
// '/' es /api/users
router.get('/', usersCtrl.getUsers);
router.post('/', usersCtrl.createUser);
router.get('/:id', usersCtrl.getUser);
router.put('/:id', usersCtrl.editUser);
router.delete('/:id', usersCtrl.deleteUser);


module.exports = router