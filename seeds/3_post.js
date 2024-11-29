/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import 'dotenv/config';
const imgPath = process.env.IMG_PATH;
export async function seed(knex) {
  await knex('post').del();
  await knex('post').insert([
    {
      id: 1,
      title: 'Dinner with Friends at a Cozy Italian Restaurant',
      desc: '<p>Last night, I had an amazing dinner with my closest friends at a cozy Italian restaurant downtown. The pasta was perfectly cooked, the wine was exquisite, and the conversations were even better. We laughed, shared stories, and had an unforgettable evening.</p>',
      img: `${imgPath}party.png`,
      user_id: 1,
      category_id: 2,
      likes: 5,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      title: 'Picnic Birthday Party for My Little baby',
      desc: '<p>We threw a lovely picnic birthday party for my little sister in the park! The weather was perfect, and the day was filled with laughter, games, and delicious homemade food. She loved the surprise cake and the thoughtful presents from everyone.</p>',
      img: `${imgPath}picnic.png`,
      user_id: 1,
      category_id: 2,
      likes: 10,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      title: 'Movie Night with Friends at Home',
      desc: '<p>A relaxing movie night with friends was just what we needed! We set up a cozy corner with blankets and pillows, made some popcorn, and enjoyed a mini-marathon of our favorite films. It was a perfect blend of comfort and fun.</p>',
      img: `${imgPath}movieNight.png`,
      user_id: 1,
      category_id: 2,
      likes: 10,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 4,
      title: 'Look at How Cute My Cat Is',
      desc: "<p>I can't stop sharing pictures of my adorable cat! She's the queen of the house and knows it. Whether she's playing with her toys, napping in the sun, or giving me her cute little head tilts, she's always the center of attention.</p>",
      img: `${imgPath}cuteCat.png`,
      user_id: 1,
      category_id: 2,
      likes: 100,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 5,
      title: 'My Cat Will Be a Genius Coder!',
      desc: "<p>Lately, my cat has been obsessed with my laptop screen. Every time I start coding, she sits beside me and seems to follow every line of code I write. Who knows? Maybe one day she'll write her own program—a meow-translator app, perhaps?</p>",
      img: `${imgPath}meowCoder.png`,
      user_id: 1,
      category_id: 2,
      likes: 10,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
