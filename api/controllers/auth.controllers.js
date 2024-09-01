




import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  if ( !email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try{
    const validUser = await User.findOne({ email });
    if (!validUser) {
    return  next(errorHandler(404, 'user not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
    return  next(errorHandler(400, 'invalid password'));
    }
    const token = jwt.sign(
      { id : validUser._id}, process.env.JWT_SECRET
    );
     const { password: pass, ...rest } = validUser._doc;
    res.status(200).cookie('access_token', token,{
      httpOnly: true
    }).json(rest);
  }
  catch(error) {
  return  next(error);
  }
};
