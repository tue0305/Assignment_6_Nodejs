require("dotenv").config();
const connectDB = require("./db")
const express = require("express");

const cors = require("cors");

// ### ROUTES
const userRouter = require(`./routes/user`);



// ***** CONNECT DATABASE *****
connectDB();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors()) // To parse the incoming requests with JSON payloads

// ### Using routes
app.use(`/api/user`, userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
