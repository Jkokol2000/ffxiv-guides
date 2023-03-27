const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


const guideSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
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
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Guide', guideSchema)