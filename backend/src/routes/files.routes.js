const { Router } = require('express');
const express = require('express');

const router = Router()
const path = require('path');
const multer = require('multer');
const uuid = require('uuid').v4;

const File = require('../models/File');

// CRUD o ABM
const filesCtrl = require('../controllers/files.controller.js');
// '/' es /api/users
router.get('/', filesCtrl.getFiles);
//router.post('/', filesCtrl.createFile);
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filePath = `${id}${ext}`;
        File.create({ filePath: filePath })
            .then(() => {
                cb(null, filePath)
            });
    }
})
const upload = multer({
    storage,
    limits: {fileSize: 1024*1024*5}
}); // or simply { dest: 'uploads/' }

router.use(express.static('public'));
router.use(express.static('uploads'));
router.use('/public/uploads', express.static(__dirname + '/public/uploads/'));

router.post('/', upload.array('avatar'), (req, res) => {
    return res.send({ message: 'File created' });
});

/* router.post('/', (req, res) => {

    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../public/uploads'),
        filename:  (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        }
    })
    const uploadImage = multer({
        storage,
        limits: {fileSize: 1024*1024*5}
    }).single('image');

    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        res.send('uploaded');
    });
}); */
router.get('/:id', filesCtrl.getFile);
router.put('/:id', filesCtrl.editFile);
router.delete('/:id', filesCtrl.deleteFile);


module.exports = router;