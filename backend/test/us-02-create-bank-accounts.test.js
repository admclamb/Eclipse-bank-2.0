/**
 * User Story 02:
 * User creates bank account when signed up
 * post bank_acccounts
 */
const { expect } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("US-02 - Create bank accounts", () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(
    (async = () => {
      return knex.migrate.rollback(null, true).then(() => knex.destroy());
    })
  );

  describe("POST /bank_accounts", () => {
    test("returns 400 if account_name is missing", async () => {
      const data = {
        balance: 0,
        customer_ID: 4,
      };
      const response = await request(app)
        .post("/bank_accounts")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.body.error).to.contain("account_name1");
      expext(response.status).to.equal(400);
    });
  });
});
