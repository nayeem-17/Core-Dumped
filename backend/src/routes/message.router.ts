import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import MessageController from '../controllers/message.controller';
const messageController = new MessageController();

const messageRouter = express.Router();

messageRouter.use(isValidJWTToken);
messageRouter.get('/', messageController.getUserMessages);
messageRouter.get('/:messageId', messageController.getMessage);
messageRouter.post('/send', messageController.sendMessage);
messageRouter.delete('/delete/:messageId', messageController.deleteMessage);
export default messageRouter;
