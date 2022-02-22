import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import QuestionController from '../controllers/question.controller';
const questionController = new QuestionController();
const questionRouter = express.Router();

questionRouter.use(isValidJWTToken);
questionRouter.post('/add', questionController.postQuestion);
// <<<<<<< kingpin
// questionRouter.get('/user/:username', questionController.getQuestionsByUser);
// =======
questionRouter.post('/search', questionController.searchQuestion);
questionRouter.get('/user/:username', questionController.getQuestionsByUser);
// >>>>>>> with-ts
questionRouter.get('/:questionId', questionController.getQuestionData);
questionRouter.get(
  '/:questionId/thumbnail',
  questionController.getQuestionThumbnail,
);
questionRouter.get(
  '/:questionId/related',
  questionController.getRelatedQuestions,
);
questionRouter.get(
  '/:questionId/voteinfo',
  questionController.getQuestionVoteInfo,
);
questionRouter.post('/:questionId/edit', questionController.editQuestionData);
questionRouter.delete('/:questionId/remove', questionController.deleteQuestion);
questionRouter.post('/:questionId/view', questionController.viewQuestion);
questionRouter.post('/:questionId/upvote', questionController.upvoteQuestion);
questionRouter.post(
  '/:questionId/downvote',
  questionController.downvoteQuestion,
);

export default questionRouter;
