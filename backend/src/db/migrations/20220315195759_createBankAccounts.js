/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bank_accounts", (table) => {
    table.increments("account_ID").primary();
    table.string("account_name");
    table.integer("balance").defaultTo(0);
    table
      .integer("customer_ID")
      .references("customer_ID")
      .inTable("customers")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bank_accounts");
};
