const userCtrl = {}

userCtrl.getUsers = (req, res) => {
    res.send('Get Users')
}
userCtrl.createUser = (req, res) => {
    res.send('Create User')
}
userCtrl.getUser = (req, res) => {
    res.send('Get User')
}
userCtrl.editUser = (req, res) => {
    res.send('Edit User')
}
userCtrl.deleteUser = (req, res) => {
    res.send('Delete User')
}

module.exports = userCtrl;