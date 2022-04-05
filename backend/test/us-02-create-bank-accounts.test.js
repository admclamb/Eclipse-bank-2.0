/**
 * User Story 02:
 * User creates bank account when signed up
 * post bank_acccounts
 */

const { expect } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");
describe("US-02 - Create and list bank accounts", () => {
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

  describe("App", () => {
    describe("Not found handler", () => {
      test("returns 404 for non-existent bank account route", async () => {
        const response = await request(app)
          .get("/aroutethatdoesntexist")
          .set("Accepts", "application/json");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          "Path not found: /aroutethatdoesntexist"
        );
      });
    });

    describe("GET /bank_accounts/:account_ID", () => {
      test("return 404 for non-existent bank account", async () => {
        const response = await request(app)
          .get("/99999")
          .set("Accepts", "application/json");

        expect(response.body.error).to.contain("99999");
        expect(response.status).to.equal(404);
      });
    });

    describe("POST /bank_accounts", () => {
      test("return ");
    });
  });
});
