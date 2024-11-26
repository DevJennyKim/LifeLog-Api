import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);

const getPosts = async (req, res) => {
  try {
    const data = await knex('post')
      .join('user', 'post.user_id', 'user.id')
      .select(
        'post.id',
        'post.title',
        'post.desc',
        'post.img',
        'post.user_id',
        'user.name as username',
        'post.category_id',
        'post.likes',
        'post.created_at'
      );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'error occurred',
      status: 500,
    });
  }
};
const getPostsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const posts = await knex('post')
      .where('category_id', categoryId)
      .join('user', 'post.user_id', 'user.id')
      .join('category', 'post.category_id', 'category.id')
      .select(
        'post.id',
        'post.title',
        'post.desc',
        'post.img',
        'post.user_id',
        'post.category_id',
        'category.category_name as category_name',
        'post.likes',
        'post.created_at',
        'user.name as username'
      );
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    res.status(500).json({ message: 'Error fetching posts', status: 500 });
  }
};

export { getPosts, getPostsByCategory };
