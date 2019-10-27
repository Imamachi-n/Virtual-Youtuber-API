const Channel = function(dbChannel) {
  this.id = dbChannel.id;
  this.channelTitleJp = dbChannel.channel_title_jp;
  this.channelTitleEn = dbChannel.channel_title_en;
  this.channelId = dbChannel.channel_id;
  this.channelUrl = `https://youtube.com/channel/${dbChannel.channel_id}`;
  this.thumbnail = dbChannel.thumbnail;
  this.viewCount = dbChannel.view_count;
  this.subscriberCount = dbChannel.subscriber_count;
  this.videoCount = dbChannel.video_count;
};

Channel.prototype.serialize = function() {
  return {
    id: this.id,
    channel_title_jp: this.channelTitleJp,
    channel_title_en: this.channelTitleEn,
    channel_id: this.channelId,
    channel_url: this.channelUrl,
    thumbnail: this.thumbnail,
    view_count: this.viewCount,
    subscriber_count: this.subscriberCount,
    video_count: this.videoCount,
  };
};

module.exports = (knex) => {
  return {
    list: require("./list")(knex, Channel),
    get: () => {},
    create: require("./create")(knex, Channel),
    mod: require("./mod")(knex, Channel),
    delete: () => {},
  };
};
