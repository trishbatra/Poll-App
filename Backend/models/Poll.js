const mongoose = require("mongoose")

const pollSchema = new mongoose.Schema({
    pollQuestion : {
        type : String,
        required : true 
    },
    pollOptions : {
        type: Array,
        required : true 
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const pollModel = mongoose.model("poll", pollSchema)

module.exports = {
    pollModel
}