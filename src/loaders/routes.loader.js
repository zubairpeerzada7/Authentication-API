/* Routes */
const studentRouter = require("../routes/student.routes");
const adminRouter = require("../routes/admin.routes");

class RoutesLoader {
  static initRoutes(app, version) {
    app.use(`/api/${version}/admin`, adminRouter);
    app.use(`/api/${version}/student`, studentRouter);
    app.use("/", async (req, res) => {
      res.status(404).send("No such route found in the API.");
    });
  }
}

module.exports = { RoutesLoader };
