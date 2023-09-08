const express = require("express");

class ExpressLoader {
  static init() {
    const app = express();

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json());

    return app;
  }
}

module.exports = { ExpressLoader };
