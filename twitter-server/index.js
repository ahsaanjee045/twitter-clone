const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const { v2: cloudinary } = require("cloudinary");

dotenv.config();

const app = express();


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

app.use(cors())
app.use(express.urlencoded({ extended: true, limit : "15mb" }));
app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.all("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "hello from twitter backend" });
});

// Database connection
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "Server is listening on port " + PORT + " and connected to DB"
      );
    });
  })
  .catch(console.log);
