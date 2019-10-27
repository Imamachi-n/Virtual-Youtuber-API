const express = require("express");

module.exports = (models) => {
  /*
   * Controller - channels
   */
  // GET - all VTuber channel data
  const listChannels = (req, res) => {
    return models.channels
      .list()
      .then((channels) => channels.map((channel) => channel.serialize()))
      .then((channels) => res.status(200).json(channels))
      .catch((err) => res.status(400).send(err.message));
  };

  // GET - a given VTuber channel data
  const getChannel = (req, res) => {
    return models.channels
      .get({
        id: req.params.id,
      })
      .then((channels) => channels.map((channel) => channel.serialize()))
      .then((channels) => res.status(200).json(channels))
      .catch((err) => res.status(400).send(err.message));
  };

  // POST - new VTuber channel
  const createChannel = (req, res) => {
    return models.channels
      .create({
        channel_title_jp: req.body.channel_title_jp,
        channel_title_en: req.body.channel_title_en,
        channel_id: req.body.channel_id,
        thumbnail: req.body.thumbnail,
      })
      .then((channels) => res.status(201).json(channels.serialize()))
      .catch((err) => res.status(400).send(err.message));
  };

  // PATCH - a given VTuber channel data
  const modChannel = (req, res) => {
    return models.channels
      .mod(req.params, req.body)
      .then((channels) => res.status(200).json(channels.serialize()))
      .catch((err) => res.status(400).send(err.message));
  };

  // DELETE - a given VTuber channel data
  const deleteChannel = (req, res) => {
    return models.channels
      .delete({
        id: req.params.id,
      })
      .then((channels) => channels.map((channel) => channel.serialize()))
      .then((channels) => res.status(200).json(channels))
      .catch((err) => res.status(400).send(err.message));
  };

  /*
   * Routes
   */
  const router = express.Router();
  router.get("", listChannels);
  router.get("/:id", getChannel);
  router.post("", createChannel);
  router.patch("/:id", modChannel);
  router.delete("/:id", deleteChannel);

  return router;
};
