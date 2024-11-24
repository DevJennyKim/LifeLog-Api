/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('guestbook', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('user.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('comment').notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('guestbook');
}
