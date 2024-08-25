const mongoose = require("mongoose");
const consts = require("../config/constants");
const mongoURI = consts.MONGO_URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, {})
    .then(() => {
      console.log("Connected !!");
    })
    .catch((err) => console.log(err));
};

module.exports = connectToMongo;
