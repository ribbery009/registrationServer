
// module.exports.getClient = function () {
//     const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://admin:N2NtlBbn9lnIap3I@cluster0.6fnyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// }

const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(
        process.env.DB_URL,
      {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
