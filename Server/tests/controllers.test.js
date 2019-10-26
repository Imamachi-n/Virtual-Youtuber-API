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

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("channel controller", () => {
  beforeEach(() => {
    // create `models` stub
    // const stubModels = sinon.mock(models.channels);
    // stubModels.list.returns(new Promise((resolve) => {
    //   resolve(5);
    // }));
    // request = chai.request(setupServer(stubModels));
  });

  describe("#list", () => {
    it("test", async () => {
      // const res = await request.get("/api/channels");
      // console.log(res);
    });
  });
});
