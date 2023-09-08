const { Config } = require("../configs/config");
const mongoose = require("mongoose");

class DatabaseLoader {
  static init() {
    // Connect to MongoDB
    mongoose.connect(`mongodb://${Config.DB_HOST}/${Config.DB_DATABASE}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    return db;
  }
}

module.exports = { DatabaseLoader };
