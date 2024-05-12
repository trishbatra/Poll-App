const mongoose = require("mongoose")
function connectToMongo(){
    mongoose.connect('mongodb://localhost:27017/PollApp')
    const db = mongoose.connection
    db.on('connected', ()=>{
        console.log("Connected to mongo")
    })
}
module.exports = {
    connectToMongo
}