const { Router } = require('express')
const router = Router()

// CRUD o ABM
const commentsCtrl = require('../controllers/comments.controller.js')
// '/' es /api/users
router.get('/', commentsCtrl.getComments);
router.post('/', commentsCtrl.createComment);
router.get('/:id', commentsCtrl.getComments);
router.put('/:id', commentsCtrl.editComment);
router.delete('/:id', commentsCtrl.deleteComment);


module.exports = router