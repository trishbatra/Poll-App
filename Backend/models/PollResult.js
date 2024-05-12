const mongoose = require("mongoose")

const pollResultSchema = new mongoose.Schema({
    totalVotes :{
        type: Number,
        required: true,
        max: 5
    },
    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'poll'
    },
    result: {
        type: String,
        required: true
    }
})

const pollResultModel = mongoose.model("resultPoll", pollResultSchema)

module.exports = {
    pollResultModel
}