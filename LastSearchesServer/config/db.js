const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/searchesDB")
    .then(() => console.log("Connected to searchesDB"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
