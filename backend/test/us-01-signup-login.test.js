/**
 * User Story 01:
 * Allow users to sign up and log in
 * get customers/customer:id
 */
const { expect } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");
describe("US-01 - Create and list customers", () => {
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
      test("returns 404 for non-existent route", async () => {
        const response = await request(app)
          .get("/aroutethatdoesntexist")
          .set("Accepts", "application/json");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          "Path not found: /aroutethatdoesntexist"
        );
      });
    });

    describe("GET /customers/:username", () => {
      test("returns 404 for non-existent username", async () => {
        const response = await request(app)
          .get("/customers/thisIsAFakeUsername")
          .set("Accept", "application/json");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.contain("thisIsAFakeUsername");
      });
    });

    describe("POST /customers", () => {
      test("returns 400  if data is missing", async () => {
        const response = await request(app)
          .post("/customers")
          .set("Accept", "application/json")
          .send({ datum: {} });

        expect(response.body.error).toBeDefined();
        expect(response.status).to.equal(400);
      });

      test("returns  400 if first name is missing", async () => {
        const data = {
          last_name: "lastName",
          username: "username",
          email: "exampleemail@email.com",
          password: "4030ppcjlkja430",
        };
        const response = await request(app)
          .post("/customers")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("first_name");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if last name is missing", async () => {
        const data = {
          first_name: "firstName",
          username: "username",
          email: "exampleemail@email.com",
          password: "4030ppcjlkja430",
        };
        const response = await request(app)
          .post("/customers")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("last_name");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if username is missing", async () => {
        const data = {
          first_name: "firstName",
          last_name: "lastName",
          email: "exampleemail@email.com",
          password: "4030ppcjlkja430",
        };
        const response = await request(app)
          .post("/customers")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.body.error).to.contain("username");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if email is missing", async () => {
        const data = {
          first_name: "firstName",
          last_name: "lastName",
          username: "username",
          password: "4030ppcjlkja430",
        };
        const response = await request(app)
          .post("/customers")
          .set("Accept", "application/json");

        expect(response.body.error).to.contain("email");
        expect(response.status).to.equal(400);
      });

      test("returns 400 if password is missing", async () => {
        const data = {
          first_name: "firstName",
          last_name: "lastName",
          username: "username",
          email: "exampleemail@email.com",
        };
        const response = await request(app)
          .post("/customers")
          .set("Accept", "application/json");

        expect(response.body.error).to.contain("password");
        expect(response.status).to.equal(400);
      });
    });
  });
});
