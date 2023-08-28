const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const errorHandler = require("./utils/erroHandler");
const { v2: cloudinary } = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log("Error => ", err.message);
  console.log("Shutting the connection down due to an uncaught exception");
  process.exit(1);
});

dotenv.config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.all("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "hello from twitter backend" });
});


app.use(errorHandler);



// Database connection
connectDB();


const PORT = process.env.PORT || 5000;
let server = app.listen(PORT, () => {
  console.log(
    `Server listening on port ${server.address().port} and Connected to DB`
  );
});


process.on("unhandledRejection", (err) => {
  console.log("Error => ", err.message);
  console.log("Shutting down the server due to an Unhandled Rejection");
  server.close(() => {
    process.exit(0);
  });
});
