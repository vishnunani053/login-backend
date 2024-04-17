const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");


const app = express();
const path = require("path")
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// console.log("path ", path.join(__dirname, "/assets/pdfFiles"));
app.use("/assets", express.static(path.join(__dirname, "/assets/pdfFiles")));
app.use("/", router);

module.exports = app;
