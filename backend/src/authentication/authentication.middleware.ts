import { NextFunction, Response } from 'express';

import jwt from 'jsonwebtoken';
import AuthRepository from '../database/repository/auth.repository';
const authRepository = new AuthRepository();

import { isPasswordValid } from './authentication.service';

const login = async (req: any, res: any, next: NextFunction) => {
  const { username, password } = req.body;
  // Fetching userData from database
  const userInfo: any = await authRepository.getUser(username);
  console.log(userInfo.data);

  if (!userInfo.success)
    return res.status(400).json({
      success: false,
      message: userInfo.error,
    });
  if (userInfo.data.length === 0)
    return res.status(409).json({
      success: false,
      message: 'User not found',
    });

  const hashPass: string = userInfo.data[0].PASSWORD;
  //  Add more info if needed
  const userId = userInfo.data[0].ID;
  const email = userInfo.data[0].EMAIL;
  console.log(hashPass);
  console.log(isPasswordValid(hashPass, password));

  if (hashPass && isPasswordValid(hashPass, password)) {
    req.body = {
      userId: userId,
      username: username,
      email: email,
    };
    next();
  } else {
    res.status(400).json({
      message: 'Invalid email or password',
    });
  }
};

const isValidJWTToken = (req: any, res: Response, next: NextFunction) => {
  const SECRET_KEY: string = process.env.JWT_SECRET || '';
  if (req.headers['authorization']) {
    try {
      const authorization = req.headers['authorization'].split(' ');
      if (authorization[0] != 'Bearer') {
        return res.status(401).json({});
      } else {
        const userData: any = jwt.verify(authorization[1], SECRET_KEY);
        //    add necessary data to request body. Here i added only userId
        console.log(userData);

        req.body.userId = userData?.userId;
        req.body.username = userData?.username;

        next();
      }
    } catch (err) {
      console.log(err);

      return res.status(403).send();
    }
  } else {
    return res
      .status(401)
      .send({ error: 'Please attach access token in headers.' });
  }
};

export { login, isValidJWTToken };
