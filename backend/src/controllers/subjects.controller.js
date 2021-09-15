const subjectCtrl = {}

const Subject = require('../models/Subject')

subjectCtrl.getSubjects = async (req, res) => {
    const subjects = await Subject.find()
    res.json(subjects)
}

subjectCtrl.createSubject = async (req, res) => {
    const newSubject = new Subject(req.body)
    await newSubject.save()
    res.send({ message: 'Subject created' })
}


subjectCtrl.getSubject = async (req, res) => {
    const subject = await Subject.findById(req.params.id)
    res.send(subject)
}


subjectCtrl.editSubject = async (req, res) => {
    await Subject.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Subject Updated'})
}



subjectCtrl.deleteSubject = async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id)
    res.json({status: 'Subject Deleted'})
}

module.exports = subjectCtrl;