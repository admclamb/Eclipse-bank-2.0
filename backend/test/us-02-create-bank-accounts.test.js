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
    describe("GET /bank_accounts/:account_ID", () => {
      test("return 404 for non-existent bank account", async () => {
        const response = await request(app)
          .get("/bank_accounts/99999")
          .set("Accepts", "application/json");

        expect(response.body.error).to.contain("99999");
        expect(response.status).to.equal(404);
      });
    });

    describe("POST /bank_accounts", () => {
      test("return 400 if account_name is missing", async () => {
        const data = {
          customer_ID: "1",
          balance: 0,
        };
        const response = await request(app)
          .post("/bank_accounts")
          .set("Accepts", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("account_name");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if customer_ID is missing", async () => {
        const data = {
          account_name: "accountName",
          balance: 0,
        };
        const response = await request(app)
          .post("/bank_accounts")
          .set("Accepts", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("customer_ID");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if balance is missing", async () => {
        const data = {
          account_name: "accountName",
          customer_ID: "1",
        };
        const response = await request(app)
          .post("/bank_accounts")
          .set("Accepts", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("balance");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if balance is not a number", async () => {
        const data = {
          account_name: "accountName",
          customer_ID: "1",
          balance: "hello",
        };
        const response = await request(app)
          .post("/bank_accounts")
          .set("Accepts", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("balance");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if balance is type string but a number character", async () => {
        const data = {
          account_name: "accountName",
          customer_ID: "1",
          balance: "100",
        };
        const response = await request(app)
          .post("/bank_accounts")
          .set("Accepts", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("balance");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if balance is less than 0", async () => {
        const data = {
          account_name: "accountName",
          customer_ID: "1",
          balance: -5000,
        };
        const response = await request(app)
          .post("/bank_accounts")
          .set("Accepts", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("balance");
        expect(response.status).to.equal(400);
      });

      test("returns 201 if data is valid", async () => {
        const data = {
          account_name: "accountName",
          customer_ID: "1",
          balance: 10,
        };
        const response = await request(app)
          .post("/bank_accounts")
          .set("Accepts", "application/json")
          .send({ data });

        expect(response.body.error).to.be.undefined;
        expect(response.body.data).to.include({
          account_name: "accountName",
          balance: 10,
        });
        expect(response.status).to.equal(201);
      });
    });
  });
});
