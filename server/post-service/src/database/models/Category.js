const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR_LINK;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true, 
    },
    imageCategory: {
        type: String,
        required: true, 
        default: DEFAULT_AVATAR,
    },
});

module.exports = mongoose.model("categories", CategorySchema,"categories");
