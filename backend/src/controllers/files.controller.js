
const fileCtrl = {}

const File = require('../models/File')

fileCtrl.getFiles = async (req, res) => {
    const files = await File.find()
    res.json(files)
    
}


fileCtrl.getFile = async (req, res) => {
    const file = await File.findById(req.params.id)
    res.send(file)
}


fileCtrl.editFile = async (req, res) => {
    await File.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'File Updated'})
}



fileCtrl.deleteFile = async (req, res) => {
    await File.findByIdAndDelete(req.params.id)
    res.json({status: 'File Deleted'})
}

module.exports = fileCtrl;