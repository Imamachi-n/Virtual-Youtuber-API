module.exports = (knex, Channel) => {
  return (params, body) => {
    const { channel_id } = params;
    const rawObj = {
      channel_title_jp: body.channel_title_jp,
      channel_title_en: body.channel_title_en,
      thumbnail: body.thumbnail,
    };

    const updateObj = {};
    for (const item in rawObj) {
      if (item !== undefined) updateObj[item] = rawObj[item];
    }

    return knex("channels")
      .where({
        channel_id,
      })
      .update(updateObj)
      .then(() => {
        return knex("channels")
          .where({
            channel_id,
          })
          .select();
      })
      .then((channels) => new Channel(channels.pop()))
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
