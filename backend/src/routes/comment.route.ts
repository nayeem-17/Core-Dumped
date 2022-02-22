import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import CommentController from '../controllers/comment.controller';
const commentController = new CommentController();
const commentRouter = express.Router();

commentRouter.use(isValidJWTToken);
commentRouter.post('/add', commentController.addComment);
commentRouter.get('/:commentId', commentController.getCommentData);
commentRouter.get(
  '/question/:questionId',
  commentController.getCommentsOfQuestion,
);
commentRouter.get(
  '/article/:articleId',
  commentController.getCommentsOfArticle,
);
commentRouter.get('/answer/:answerId', commentController.getCommentsOfAnswer);
commentRouter.get('/user/:username', commentController.getCommentsByUser);
commentRouter.put('/update/:commentId', commentController.updateComment);
commentRouter.delete('/delete/:commentId', commentController.deleteComment);
export default commentRouter;
