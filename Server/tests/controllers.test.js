const { expect, assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const sinon = require("sinon");

const { setupServer } = require("../index");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const TABLE_CHANNELS = "channels";

describe("channel controller", () => {
  beforeEach(() => {
    // create `models` stub
    // const stubModels = sinon.mock(models.channels);
    // stubModels.list.returns(new Promise((resolve) => {
    //   resolve(5);
    // }));
    request = chai.request(setupServer(models));
  });

  describe("GET - /api/channels", () => {
    const newChannel = {
      channel_title_jp: "VTuber Naoto JP",
      channel_title_en: "VTuber Naoto EN",
      channel_id: "XXXXX",
      thumbnail: undefined,
    };

    before(() => models.channels.create(newChannel));
    after(() => knex(TABLE_CHANNELS).delete());

    it("should return list of all channels", async () => {
      const res = await request.get("/api/channels");
      expect(res.body[0].channel_title_jp).to.be.eq(
        newChannel.channel_title_jp
      );
      expect(res.body[0].channel_title_en).to.be.eq(
        newChannel.channel_title_en
      );
      expect(res.body[0].channel_id).to.be.eq(newChannel.channel_id);
    });
  });

  describe("POST - /api/channels/:id", () => {
    const newChannel = {
      channel_title_jp: "VTuber Naoto JP",
      channel_title_en: "VTuber Naoto EN",
      channel_id: "XXXXX",
      thumbnail: "http://xxxx",
    };

    after(() => knex(TABLE_CHANNELS).delete());

    it("should create a channel", async () => {
      const res = await request.post("/api/channels/").send(newChannel);
      expect(res.body.id).to.be.a("number");
      expect(res.body.channel_title_jp).to.be.eq(newChannel.channel_title_jp);
      expect(res.body.channel_title_en).to.be.eq(newChannel.channel_title_en);
      expect(res.body.channel_id).to.be.eq(newChannel.channel_id);
      expect(res.body.thumbnail).to.be.eq(newChannel.thumbnail);
      expect(res.body.view_count).to.be.eq(0);
      expect(res.body.subscriber_count).to.be.eq(0);
      expect(res.body.video_count).to.be.eq(0);
    });

    it("should return err message when a duplicate channel name is provided", async () => {
      const res = await request.post("/api/channels").send(newChannel);
      expect(res.text).to.be.eq("That channel already exists");
    });
  });

  describe("PATCH - /api/channels/:id", () => {
    const newChannel = {
      channel_title_jp: "VTuber Naoto JP",
      channel_title_en: "VTuber Naoto EN",
      channel_id: "YYYYYY",
      thumbnail: "http://xxxx",
    };

    const reqBody = {
      channel_title_jp: "TEST USER JP",
      channel_title_en: "TEST USER EN",
      thumbnail: "ZZZZZZ",
    };

    before(() => models.channels.create(newChannel));
    after(() => knex(TABLE_CHANNELS).delete());

    it("should return updated channel data - #1", async () => {
      const res = await request
        .patch(`/api/channels/${newChannel.channel_id}`)
        .send(reqBody);

      expect(res.body.channel_id).to.be.eq(newChannel.channel_id);
      expect(res.body.channel_title_jp).to.be.eq(reqBody.channel_title_jp);
      expect(res.body.channel_title_en).to.be.eq(reqBody.channel_title_en);
      expect(res.body.thumbnail).to.be.eq(reqBody.thumbnail);
    });

    it("should return updated channel data - #2", async () => {
      const reqModBody = {
        channel_title_en: "MOD USER EN",
      };

      const res = await request
        .patch(`/api/channels/${newChannel.channel_id}`)
        .send(reqModBody);

      expect(res.body.channel_id).to.be.eq(newChannel.channel_id);
      expect(res.body.channel_title_jp).to.be.eq(reqBody.channel_title_jp);
      expect(res.body.channel_title_en).to.be.eq(reqModBody.channel_title_en);
      expect(res.body.thumbnail).to.be.eq(reqBody.thumbnail);
    });
  });
});
