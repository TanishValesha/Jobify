const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jobRouter = require("./routers/jobRouter");
const authRouter = require("./routers/authRoute");
const userRouter = require("./routers/userRoute");
const statsRouter = require("./routers/statsRoute");
const { StatusCodes } = require("http-status-codes");
const { customErrorMiddleWare } = require("./middlewares/errorMiddleware");
const { authFunction } = require("./middlewares/authMiddleware");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

//=================== ROUTING ===================
app.use(customErrorMiddleWare);
app.use("/jobs", jobRouter);
app.use("/users", authRouter);
app.use("/user-stats", authFunction, userRouter);
app.use("/stats", authFunction, statsRouter);

app.get("/test-route", (req, res) => {
  res.json("Hello, World");
});

try {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("DB Connected");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
