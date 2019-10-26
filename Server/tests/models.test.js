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
    it("should return the list of all channels", () => {
      models.channels.list().then((channels) => {
        expect(channels.length).to.equal(697);
      });
    });

    it("should return serializable objects", (done) => {
      models.channels
        .list()
        .then((channels) => {
          expect(channels[0].serialize).to.be.a("function");
          expect(channels[0].serialize().id).to.be.a("number");
          expect(channels[0].serialize().channel_title_jp).to.be.a("string");
          expect(channels[0].serialize().channel_title_en).to.be.a("string");
          expect(channels[0].serialize().channel_id).to.be.a("string");
          expect(channels[0].serialize().channel_url).to.be.a("number");
          expect(channels[0].serialize().view_count).to.be.a("number");
          expect(channels[0].serialize().subscriber_count).to.be.a("string");
          expect(channels[0].serialize().video_count).to.be.a("number");
          done();
        })
        .catch((err) => console.log(err));
    });
  });
});
