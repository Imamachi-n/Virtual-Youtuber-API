module.exports = (knex) => {
  return {
    channels: require("./channels")(knex),
  };
};
