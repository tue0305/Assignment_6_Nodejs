// ***** CONNECT DATABASE *****
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fpt-assignment-5.tvjcn.mongodb.net/fpt-assignment-5?retryWrites=true&w=majority`
      );
      console.log(`MongoDB connected!`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
};
  
module.exports = connectDB