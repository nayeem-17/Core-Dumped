import express from 'express';
import FileController from '../controllers/file.controller';
const fileController = new FileController();

const fileRouter = express.Router();

fileRouter.post(
  '/upload',
  fileController.upload.single('file'),
  fileController.uploadFile,
);

export default fileRouter;
