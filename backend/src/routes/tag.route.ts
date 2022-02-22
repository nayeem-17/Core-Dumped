import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import TagController from '../controllers/tag.controller';
const tagController = new TagController();
const tagRouter = express.Router();

tagRouter.use(isValidJWTToken);
tagRouter.get('/:tagId', tagController.getTagData);
tagRouter.get('/:tagId/thumbnail', tagController.getTagThumbnail);
tagRouter.get('/:tagId/questions', tagController.getQuestions);
tagRouter.get('/:tagId/articles', tagController.getArticles);
tagRouter.get('/user/:username', tagController.getProfileInterests);
tagRouter.get('/question/:questionId', tagController.getQuestionTags);
tagRouter.post('/question/:questionId/add', tagController.addQuestionTag);
tagRouter.post('/question/:questionId/remove', tagController.removeQuestionTag);
tagRouter.get('/article/:articleId', tagController.getArticleTags);
tagRouter.post('/article/:articleId/add', tagController.addArticleTag);
tagRouter.post('/article/:articleId/remove', tagController.removeArticleTag);
tagRouter.post('/search', tagController.searchTag);
tagRouter.post('/user/:username/add', tagController.addProfileInterest);
tagRouter.post('/user/:username/remove', tagController.removeProfileInterest);

export default tagRouter;
