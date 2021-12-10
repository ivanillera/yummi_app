const userCtrl = {}

const User = require('../models/User');

const jwt = require('jsonwebtoken');


userCtrl.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

userCtrl.createUser = async (req, res) => {
    const newUser = new User(req.body)
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(200).json({token})
}

userCtrl.signIn = async (req,res) => {
    const {mail, password} = req.body;
    const user = await User.findOne({mail})
    if (!user) return res.status(401).send('El correo no existe');
    if (user.password !== password) return res.status(401).send('La contraseña no es valida');

    const token = jwt.sign({_id: user._id}, 'secretKey')
    res.status(200).json({token})
}

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user)
}


userCtrl.editUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'User Updated'})
}


userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({status: 'User Deleted'})
}

userCtrl.profile = async (req, res) => {
    res.send(req.userId);
}

module.exports = userCtrl;

