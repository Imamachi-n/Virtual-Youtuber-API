module.exports = (knex, Channel) => {
  return (params) => {
    const {
      channel_title_jp,
      channel_title_en,
      channel_id,
      thumbnail,
    } = params;

    const channel = new Channel({
      channel_title_jp,
      channel_title_en,
      channel_id,
      thumbnail,
      view_count: 0,
      subscriber_count: 0,
      video_count: 0,
    });

    return knex("channels")
      .insert(channel.serialize())
      .then(() => {
        return knex("channels")
          .where({
            channel_id,
          })
          .select();
      })
      .then((channels) => {
        console.log(channels);
        new Channel(channels.pop());
      })
      .catch((err) => {
        // throw unique constraint error
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That channel already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
