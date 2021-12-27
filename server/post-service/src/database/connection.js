const mongoose = require("mongoose");
const { DB_URL } = require("../config/config");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(DB_URL, {});
=======
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
