const mongoose = require("mongoose");

module.exports.connectToDb = async (req, res) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
      console.log("Connected successfully to the database");
    })
    .catch((err) => {
      console.log(err);
    });
};