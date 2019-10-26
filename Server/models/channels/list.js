module.exports = (knex, Channel) => {
  return () => {
    return knex("channels")
      .select()
      .then((res) => res.map((channel) => new Channel(channel)));
  };
};
