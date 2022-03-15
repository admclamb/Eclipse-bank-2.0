/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("customers", (table) => {
    table.increments("customer_ID").primary();
    table.string("fname");
    table.string("lname");
    table.string("username");
    table.string("password");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
