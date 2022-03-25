const knex = require("../db/connection");

function list() {
  return knex("bank_accounts").select("*");
}

function create(bank_account) {
  return knex("bank_accounts")
    .insert(bank_account)
    .returning("*")
    .then((data) => data[0]);
}

function read(account_ID) {
  return knex("bank_accounts").select("*").where({ account_ID }).first();
}

module.exports = {
  list,
  create,
  read,
};
