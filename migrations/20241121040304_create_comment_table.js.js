/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('comment', (table) => {
    table.increments('id').primary();
    table.string('comment').notNullable();
    table
      .integer('user_id')
      .unsigned()
      .references('user.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('post_id')
      .unsigned()
      .references('post.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('likes').notNullable();
    table.integer('quantity').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('comment');
}
