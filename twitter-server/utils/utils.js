const { v2: cloudinary } = require("cloudinary");
const fs = require("fs/promises");

module.exports.uploadFile = async (file) => {
  let tempFile = `./${Date.now()}-${Math.random() * 100000}-${
    file.originalname.split(".")[0]
  }.jpg`;

  await fs.writeFile(tempFile, file.buffer);

  let { secure_url } = await cloudinary.uploader.upload(tempFile, {
    folder: "profile-pictures",
    allowed_formats: ["jpg", "png"],
    format: "jpg",
  });

  await fs.unlink(tempFile);

  return secure_url;
};
