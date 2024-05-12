const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type : String,
        minlength: 8,
        trim: true,
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
