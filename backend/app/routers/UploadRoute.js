const express = require("express");
const multer = require("multer");
const router = express.Router();
const uploadController = require("../controllers/UploadController");

const upload = multer({ dest: 'uploads/' });

router.post("/upload", upload.single("file"), uploadController.uploadFile);

module.exports = router;