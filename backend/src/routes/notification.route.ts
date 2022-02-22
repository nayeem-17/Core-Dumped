import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import NotificationController from '../controllers/notification.controller';
const notificationController = new NotificationController();
const notificationRouter = express.Router();

notificationRouter.use(isValidJWTToken);
notificationRouter.get('/', notificationController.getNotifications);
notificationRouter.post(
  '/:notificationId',
  notificationController.markReadNotification,
);
export default notificationRouter;
