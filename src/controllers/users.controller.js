const userCtrl = {}

const User = require('../models/User')

userCtrl.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

userCtrl.createUser = async (req, res) => {
    const newUser = new User(req.body)
    await newUser.save()
    res.send({ message: 'User created' })
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

module.exports = userCtrl;