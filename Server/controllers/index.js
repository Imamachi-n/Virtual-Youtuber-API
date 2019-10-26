const express = require("express");

const router = express.Router();

const channelRouter = require("./channels");

module.exports = (models) => {
  router.use("/channels", channelRouter(models));

  return router;
};
