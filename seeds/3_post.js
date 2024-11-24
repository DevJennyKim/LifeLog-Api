/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('post').del();
  await knex('post').insert([
    {
      id: 1,
      title: 'My first post',
      desc: 'This is my first post about cats!',
      img: 'cat1.png',
      user_id: 1,
      category_id: 1,
      likes: 5,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      title: 'Life is beautiful',
      desc: 'Sharing some thoughts about life.',
      img: 'life1.png',
      user_id: 2,
      category_id: 2,
      likes: 10,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
