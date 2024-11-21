import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import initKnex from 'knex';
import configuration from '../knexfile.js';

const knex = initKnex(configuration);

function authenticateToken(req, res, next) {}
