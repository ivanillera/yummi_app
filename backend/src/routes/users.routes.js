const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken');
// CRUD o ABM
const usersCtrl = require('../controllers/users.controller.js')
// '/' es /api/users
router.get('/', usersCtrl.getUsers);
router.post('/signup', usersCtrl.createUser);
router.post('/signin', usersCtrl.signIn);
router.get('/profile', verifyToken, usersCtrl.profile);
router.get('/:id', usersCtrl.getUser);
router.put('/:id', usersCtrl.editUser);
router.delete('/:id', usersCtrl.deleteUser);


module.exports = router

function verifyToken(req, res, next){
    console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(401).send('No tienes la autorización para esto');
    }
    /* Spliteamos el token ya que viene con un string de Bearer y un espacio */
    const token = req.headers.authorization.split(' ')[1]
    if(token == 'null'){
        return res.status(401).send('No tienes la autorización para esto');
    }

    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id;
    next();
}