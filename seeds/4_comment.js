/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('comment').del();
  await knex('comment').insert([
    {
      id: 1,
      comment: 'Amazing post!',
      user_id: 2,
      post_id: 1,
      likes: 3,
      quantity: 1,
      created_at: knex.fn.now(),
    },
    {
      id: 2,
      comment: 'Thank you for sharing!',
      user_id: 1,
      post_id: 2,
      likes: 4,
      quantity: 1,
      created_at: knex.fn.now(),
    },
  ]);
}
