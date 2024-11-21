/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('category').del();
  await knex('category').insert([
    { id: 1, category_name: 'Cat' },
    { id: 2, category_name: 'Life' },
    { id: 3, category_name: 'Cooking' },
  ]);
}
