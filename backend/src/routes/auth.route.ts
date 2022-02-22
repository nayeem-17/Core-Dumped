import express from 'express';
import getAccessToken from '../authentication/authentication.controllers';
import { login } from '../authentication/authentication.middleware';
import AuthController from '../controllers/profile.auth.controller';
const authController = new AuthController();

const authRouter = express.Router();

authRouter.post('/token', login, getAccessToken);
authRouter.post('/register', authController.register);

export default authRouter;
