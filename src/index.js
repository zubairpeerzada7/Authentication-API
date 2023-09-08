const { ExpressLoader } = require("./loaders/express.loader");
const { DatabaseLoader } = require("./loaders/database.loader");
const { RoutesLoader } = require("./loaders/routes.loader");

//models mongodb
const Admin = require("./models/admin");
const Student = require("./models/student");
const Slot = require("./models/slot");
const { Config } = require("./configs/config");

const app = ExpressLoader.init();

// load database
DatabaseLoader.init();

// init routes
const version = "v1";
RoutesLoader.initRoutes(app, version);

// Start the server
const port = Number(Config.PORT);
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
