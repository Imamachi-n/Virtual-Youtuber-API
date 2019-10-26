// Import knex.js configuration
const config = require("./config");

// Initialize a connection to the database, and pass it to models
const knex = require("knex")(config.db);
