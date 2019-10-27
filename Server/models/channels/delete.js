module.exports = (knex, Channel) => {
  return (params) => {
    const { channel_id } = params;

    return knex("channels")
      .where({
        channel_id,
      })
      .delete()
      .then(() => {
        return knex("channels").select();
      })
      .then((channels) => channels.map((channel) => new Channel(channel)))
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
