/**
 * User Story 01:
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
});
