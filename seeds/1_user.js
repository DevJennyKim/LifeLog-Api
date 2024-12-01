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
      password: '$2a$10$OQUk5pqkcs1rp4lhwfs.te.eErXbwFFjK8vIuOFs2QvtPS8Ogg/FC', // hashed password: "Admin1234!"
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: 'Jenny Kim',
      email: 'jenny.kim@email.com',
      password: '$2b$12$25D.Uh2IbBQC3UXjLKtehuaDwFRl1OfUpndFKlLffwpF0GOpFaGXq', // hashed password: "Mypassword1234!"
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
