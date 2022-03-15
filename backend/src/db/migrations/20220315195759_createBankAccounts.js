/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bank_accounts", (table) => {
    table.increments("account_ID").primary();
    table
      .foreign("customer_ID")
      .references("customers.customer_ID")
      .deferrable("deferred");
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
