const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "user"
    },
    

    token: {
        type: String,
        required: true,  
    },

    createdDate: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

module.exports = mongoose.model("tokens", TokenSchema);