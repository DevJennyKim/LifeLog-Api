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
      title:
        'A Fun Cooking Class Experience: Learning to Make Delicious Dishes!',
      desc: "<p><strong>Today, I had the pleasure of attending a cooking class where I learned some amazing cooking techniques and recipes.</strong> </p><p><br></p><p>The class was incredibly hands-on, and we got to try our hands at making some popular dishes that I've always wanted to master. From chopping ingredients to carefully preparing each step, it was a great learning experience.</p><p><br></p><p>We made a variety of dishes, and I was impressed by how easy the instructor made everything seem. I particularly loved learning how to balance flavors and use spices in a way that truly enhances the dish. </p><p>The best part was, of course, getting to taste everything at the end! It was a wonderful experience, and I can’t wait to try making these dishes at home.</p><p><br></p><p><em>The photos from the class turned out great – here’s one from the moment we were all busy in the kitchen, creating something delicious!</em></p>",
      img: `${imgPath}cookingClass.png`,
      user_id: 2,
      category_id: 3,
      likes: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
      title: 'My Cat Will Be a Genius Coder!',
      desc: "<p>Lately, my cat has been obsessed with my laptop screen. Every time I start coding, she sits beside me and seems to follow every line of code I write. Who knows? Maybe one day she'll write her own program—a meow-translator app, perhaps?</p>",
      img: `${imgPath}meowCoder.png`,
      user_id: 1,
      category_id: 2,
      likes: 10,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 7,
      title: 'My Homemade K-Food',
      desc: "<p><br></p><p><br></p><p><strong>Today, I decided to recreate two of my favorite Korean dishes: Soondubu Jjigae (spicy soft tofu stew) and Gimbap (Korean rice rolls).</strong></p><p><br></p><p>Both of these dishes are staples in any Korean household, and they remind me of warm family meals shared together.</p><p>For the Soondubu Jjigae, I used fresh ingredients like tofu, vegetables, and gochujang to create a flavorful broth, perfect for the chilly weather. The Gimbap, on the other hand, was a fun challenge! Rolling up seasoned rice with vegetables, pickled radish, and a touch of sesame oil was a blast.</p><p><br></p><p>Both dishes are simple to make, but the comfort they bring is unmatched.</p><p><br></p><p><em>If you're looking to try Korean food at home, I highly recommend these recipes!</em></p><p><br></p><p><br></p>",
      img: `${imgPath}koreanFood.png`,
      user_id: 2,
      category_id: 3,
      likes: 5,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
