const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

function deleteFileAfterTimeout(filePath, timeout) {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log(
          `File ${filePath} deleted after ${timeout / 1000} seconds`
        );
      }
    });
  }, timeout);
}

const resizeImage = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const resizedImagePath = path.join(
      __dirname,
      "../uploads",
      `resized-${req.file.originalname}`
    );

    const resizedImage = await sharp(imagePath)
      .resize({ width: 500 })
      .toFile(resizedImagePath);

    res
      .status(200)
      .json({ url: `/uploads/${path.basename(resizedImagePath)}` });

    deleteFileAfterTimeout(imagePath, 600000);
    deleteFileAfterTimeout(resizedImagePath, 600000);
  } catch (error) {
    console.error("Error resizing image:", error);
    res.status(500).json({ error: "Error resizing image" });
  }
};

const serveFile = (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
};

const downloadFile = (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath, req.params.filename);
  } else {
    res.status(404).json({ error: "File not found" });
  }
};

module.exports = {
  resizeImage,
  serveFile,
  downloadFile,
};
