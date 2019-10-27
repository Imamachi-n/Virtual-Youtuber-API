const config = require("../config");
const knex = require("knex")(config.db);

knex("channels")
  .delete()
  .then(process.exit);
