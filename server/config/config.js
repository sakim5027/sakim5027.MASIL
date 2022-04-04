const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    mongoURI: process.env.MONGO_URI
  },

  production: {
    mongoURI: process.env.MONGO_URI
  }
}