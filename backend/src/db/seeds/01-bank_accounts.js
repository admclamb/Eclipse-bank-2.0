const BANK_ACCOUNTS_DATA = require("./01-bank_accounts.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE bank_accounts RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("bank_accounts").insert(BANK_ACCOUNTS_DATA);
    });
};
