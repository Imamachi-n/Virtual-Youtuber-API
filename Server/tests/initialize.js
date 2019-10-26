const config = require("../config");
const knex = require("knex")(config.db);

const newChannel = {
  channel_title_jp: "VTuber Naoto JP",
  channel_title_en: "VTuber Naoto EN",
  channel_id: "XXXXX",
  thumbnail: undefined,
};

module.exports = {
  newChannel,
};

knex("channels")
  .where({
    channel_title_jp: newChannel.channel_title_jp,
  })
  .delete()
  .then(process.exit)
  .catch((err) => console.log(err));
