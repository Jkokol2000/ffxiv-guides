const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
        )


const guideSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    author: {
        type: String,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    title: {
        type:String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    ranking:{
        type: Array,
        default: []
    },
    comments: [commentSchema], 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Guide', guideSchema)
