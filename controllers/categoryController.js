import initKnex from 'knex';

import configuration from '../knexfile.js';

const knex = initKnex(configuration);

const getCategory = async (req, res) => {
  try {
    const data = await knex('category');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'error occurred',
      status: 500,
    });
  }
};

export { getCategory };
