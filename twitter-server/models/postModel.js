const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    media: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
  
const Post = mongoose.model("post", postSchema);
module.exports = Post;
