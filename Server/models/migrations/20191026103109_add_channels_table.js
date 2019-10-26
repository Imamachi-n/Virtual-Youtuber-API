exports.up = function(knex) {
  // create the `channels` table
  return knex.schema.createTable("channels", (table) => {
    table.increments().index();

    table
      .string("channel_title_jp", 100)
      .notNullable()
      .index();

    table.string("channel_title_en", 100).index();

    table
      .string("channel_id", 50)
      .unique()
      .notNullable()
      .index();

    table
      .string("channel_url", 200)
      .unique()
      .notNullable();

    table.string("thumbnail", 200);

    table.integer("view_count", 20).notNullable();

    table.integer("subscriber_count", 20).notNullable();

    table.integer("video_count", 20).notNullable();
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the `channels` table
  knex.schema.dropTable("channels");
};
