const mongoose = require("mongoose");
const { DB_URL } = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {});
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
