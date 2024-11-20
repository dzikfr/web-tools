const express = require("express");
const multer = require("multer");
const path = require("path");
const imageController = require("../controllers/imageController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/resize", upload.single("image"), imageController.resizeImage);
router.get("/file/:filename", imageController.serveFile);
router.get("/download/:filename", imageController.downloadFile);

module.exports = router;
