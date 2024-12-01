/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.hasTable('post').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('post', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('desc').notNullable();
        table.string('img').notNullable();
        table
          .integer('user_id')
          .unsigned()
          .references('user.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .integer('category_id')
          .unsigned()
          .references('category.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.integer('likes');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
          .timestamp('updated_at')
          .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
    }
  });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('post');
}
