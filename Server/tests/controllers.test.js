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

  describe("#list", () => {
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
});
