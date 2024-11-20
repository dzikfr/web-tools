const express = require("express");
const os = require("os");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const {config} = require("dotenv");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", imageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
