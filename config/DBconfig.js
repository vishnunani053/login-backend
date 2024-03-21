const mongoose = require("mongoose");
require("dotenv").config();

const mongo_uri = process.env.MONGODB_URI;

const connectDatabase = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(mongo_uri)
console.log("mongo db connected successfully")
};

module.exports = connectDatabase;
