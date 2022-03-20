const CUSTOMERS_DATA = require("./00-customers.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE customers RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("customers").insert(CUSTOMERS_DATA);
    });
};
