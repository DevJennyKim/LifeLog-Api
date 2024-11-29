import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import initKnex from 'knex';

import configuration from '../knexfile.js';

const knex = initKnex(configuration);

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(498).json({ message: 'Token is invalid or expired' });
    }
    req.user = decoded;
    next();
  });
}

const register = async (req, res) => {
  console.log('Register endpoint hit', req.body);
  try {
    const { username, email, password } = req.body;
    const existingUser = await knex('user')
      .where('email', email)
      .orWhere('name', username)
      .first();

    if (existingUser) {
      return res.status(409).json('User already exists!');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
      name: username,
      email,
      password: hash,
    };
    await knex('user').insert(newUser);
    return res.status(200).json('User has been created!');
  } catch (error) {
    console.error('Error during user registration:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error });
  }
};

const login = async (req, res) => {
  try {
    const user = await knex('user').where({ email: req.body.email }).first();

    if (!user) {
      return res
        .status(401)
        .json({ message: 'No User Found, Authentication failed' });
    }
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2h' }
    );
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'None',
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: 'Logged in successfully',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const logout = (_req, res) => {
  res
    .clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
const validatePassword = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await knex('user').where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error validating password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { login, authenticateToken, register, logout, validatePassword };
