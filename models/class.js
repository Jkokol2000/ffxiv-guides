const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    classType : {
        type: String,
        required: true
    }
    }
)

module.exports = mongoose.model('Class', classSchema);