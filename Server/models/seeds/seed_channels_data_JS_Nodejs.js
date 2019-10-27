const jsonData = require("../../../Batch/data/JS_NodeJS_alldata.json");

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("channels")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("channels").insert(
        jsonData.channels.map((channel) => {
          return {
            channel_title_jp: channel.channelTitle,
            channel_id: channel.channelId,
            channel_url: channel.channelUrl,
            thumbnail: channel.thumbnails,
            view_count: channel.viewCount,
            subscriber_count: channel.subscriberCount,
            video_count: channel.videoCount,
          };
        })
      );
    });
};
