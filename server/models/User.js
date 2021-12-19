const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: "string",
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: "string",
        required: true,
    },
    confirmPassword: {
        type: "string",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

module.exports = mongoose.model("users", UserSchema);
