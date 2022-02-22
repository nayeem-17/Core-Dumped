import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import AnswerController from '../controllers/answer.controller';
const answerController = new AnswerController();
const answerRouter = express.Router();

answerRouter.use(isValidJWTToken);
answerRouter.post('/add', answerController.addAnswer);
answerRouter.get('/user/:username', answerController.getAnswersByUser);
answerRouter.get(
  '/question/:questionId',
  answerController.getAnswersOfQuestion,
);
answerRouter.get('/:answerId/voteinfo', answerController.getAnswerVoteInfo);
answerRouter.get('/:answerId', answerController.getAnswerData);
answerRouter.put('/:answerId/edit', answerController.updateAnswer);
answerRouter.delete('/:answerId/remove', answerController.deleteAnswer);
answerRouter.post('/:answerId/upvote', answerController.upVoteAnswer);
answerRouter.post('/:answerId/downvote', answerController.downVoteAnswer);
export default answerRouter;
