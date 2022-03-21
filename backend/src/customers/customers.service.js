const knex = require("../db/connection");

function read(username) {
  return knex("customers").select("*").where({ username }).first();
}

module.exports = {
  read,
};
