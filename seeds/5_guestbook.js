/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('guestbook').del();
  await knex('guestbook').insert([
    {
      id: 1,
      user_id: 1,
      comment: 'Welcome to my profile!',
    },
    {
      id: 2,
      user_id: 2,
      comment: 'So glad to be here!',
    },
  ]);
}
