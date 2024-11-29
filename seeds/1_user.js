/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('user').del();
  await knex('user').insert([
    {
      id: 1,
      name: 'admin',
      email: 'admin@email.com',
      password: '$2b$12$uEbFP8BHUG/G7crosMyHROTkuvWgxFW3Xl5Gc70/nXgzaZX/Nj00S', // hashed password: "1234"
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: 'Jenny Kim',
      email: 'jenny.kim@email.com',
      password: '$2b$10$OY3NsEoIihG9lj9F3SO9Ie5UdFyNL02.kMDlRb6u2RbLoDSfbl1le', // hashed password: "mypassword"
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
