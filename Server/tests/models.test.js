const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const TABLE_CHANNELS = "channels";

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("channels table", () => {
  describe("database setup", () => {
    it("able to connect to database", () =>
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db")));

    it("has run the initial migrations", () => {
      knex(TABLE_CHANNELS)
        .select()
        .catch(() => assert.fail("users table is not found."));
    });
  });

  describe("#list", () => {
    it("should return the list of all channels", (done) => {
      models.channels
        .list()
        .then((channels) => {
          expect(channels.length).to.equal(697);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should return serializable objects", (done) => {
      models.channels
        .list()
        .then((channels) => {
          expect(channels[0].serialize).to.be.a("function");
          expect(channels[0].serialize().id).to.be.a("number");
          expect(channels[0].serialize().channel_title_jp).to.be.a("string");
          expect(channels[0].serialize().channel_id).to.be.a("string");
          expect(channels[0].serialize().channel_url).to.be.a("string");
          expect(channels[0].serialize().view_count).to.be.a("number");
          expect(channels[0].serialize().subscriber_count).to.be.a("number");
          expect(channels[0].serialize().video_count).to.be.a("number");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("#create", () => {
    const newChannel = {
      channel_title_jp: "VTuber Naoto JP",
      channel_title_en: "VTuber Naoto EN",
      channel_id: "XXXXX",
      thumbnail: undefined,
    };

    beforeEach(() =>
      knex(TABLE_CHANNELS)
        .where({
          channel_title_jp: newChannel.channel_title_jp,
        })
        .delete()
    );

    afterEach(() =>
      knex(TABLE_CHANNELS)
        .where({
          channel_title_jp: newChannel.channel_title_jp,
        })
        .delete()
    );

    it("should create a channel", (done) => {
      models.channels
        .create(newChannel)
        .then((channel) => {
          expect(channel.id).to.be.a("number");
          expect(channel.channelTitleJp).to.be.eq(newChannel.channel_title_jp);
          expect(channel.channelTitleEn).to.be.eq(newChannel.channel_title_en);
          expect(channel.channelId).to.be.eq(newChannel.channel_id);
          expect(channel.thumbnail).to.be.eq(null);
          expect(channel.viewCount).to.be.eq(0);
          expect(channel.subscriberCount).to.be.eq(0);
          expect(channel.videoCount).to.be.eq(0);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    // context("should return err message when a duplicate channel name is provided", () => {
    //   beforeEach((done) => {
    //     models.channels.create(newChannel);
    //     done();
    //   });

    //   it("should return err message when a duplicate channel name is provided", (done) => {
    //     models.channels.create(newChannel).then(forcePromiseReject).catch((err) => expect(err.message).to.be.equal("That channel already exists"))
    //     done();
    //   });
    // });
  });
});
