/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('comment').del();
  await knex('comment').insert([
    {
      id: 1,
      comment: 'Amazing post!',
      user_id: 2,
      post_id: 1,
      likes: 3,
      created_at: knex.fn.now(),
    },
    {
      id: 2,
      comment: 'Thank you for sharing!',
      user_id: 1,
      post_id: 2,
      likes: 2,
      created_at: knex.fn.now(),
    },
    {
      id: 3,
      comment: 'Amazing post!',
      user_id: 1,
      post_id: 3,
      likes: 4,

      created_at: knex.fn.now(),
    },
    {
      id: 4,
      comment: 'Thank you for sharing!',
      user_id: 1,
      post_id: 4,
      likes: 4,

      created_at: knex.fn.now(),
    },
    {
      id: 5,
      comment: 'Amazing post!',
      user_id: 2,
      post_id: 5,
      likes: 1,

      created_at: knex.fn.now(),
    },
  ]);
}
