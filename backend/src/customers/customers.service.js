const knex = require("../db/connection");

function list() {
  return knex("customers").select("*");
}

function create(customer) {
  return knex("customers")
    .insert(customer)
    .returning("*")
    .then((data) => data[0]);
}

function read(username) {
  return knex("customers").select("*").where({ username }).first();
}

module.exports = {
  list,
  create,
  read,
};
