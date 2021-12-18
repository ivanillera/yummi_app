
const multer = require('multer')
const { Router } = require('express'); 

const router = new Router();

const path = require('path');
const fs = require('fs');

const fileCtrl = {}

const File = require('../models/File')

fileCtrl.getFiles = async (req, res) => {
    const files = await File.find()
    res.json(files)
}

fileCtrl.createFile = async (req, res) => {
    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../public/uploads'),
        filename:  (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        }
    })
    const uploadImage = multer({
        storage,
        limits: {fileSize: 1024*1024*5}
    }).single('file');

    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        //const newFile = new File(req.body)
        //await newFile.save()
        //res.send({ message: 'File created' })
    });
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