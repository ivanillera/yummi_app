const commentCtrl = {}

const Comment = require('../models/Comment')

commentCtrl.getComments = async (req, res) => {
    const comments = await Comment.find()
    res.json(comments)
}

commentCtrl.createComment = async (req, res) => {
    const newComment = new Comment(req.body)
    await newComment.save()
    res.send({ message: 'Comment created' })
}


commentCtrl.getComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    res.send(comment)
}


commentCtrl.editComment = async (req, res) => {
    await Comment.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Comment Updated'})
}



commentCtrl.deleteComment = async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id)
    res.json({status: 'Comment Deleted'})
}

module.exports = commentCtrl;