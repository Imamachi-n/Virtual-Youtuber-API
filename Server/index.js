// Import knex.js configuration
const config = require("./config");

// Initialize a connection to the database, and pass it to models
const knex = require("knex")(config.db);
const models = require("./models")(knex);

const bodyParser = require("body-parser");
const express = require("express");

/******* Server Setup ********/
const setupServer = (models) => {
  const apiRouter = require("./controllers")(models);
  const app = express();

  // setup response header
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS,PATCH"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    next();
  });

  // parse request body as JSON
  app.use(
    bodyParser.json({
      type: "application/json",
      limit: "50mb",
    })
  );

  // the request begin with '/api'
  app.use("/api", apiRouter);

  // error handling
  app.use((err, req, res, next) => {
    if (err.stack) {
      if (err.stack.match("node_modules/body-parser"))
        return res.status(400).send("Invalid JSON");
    }

    console.log(err);
    return res.status(500).send("Internal Error.");
  });

  return app;
};

/******* Server start ********/
setupServer(models).listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});

module.exports = {
  setupServer,
};
