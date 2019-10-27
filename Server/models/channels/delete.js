module.exports = (knex, Channel) => {
  return (params) => {
    const { id } = params;

    return knex("channels")
      .where({
        channel_id: id,
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
