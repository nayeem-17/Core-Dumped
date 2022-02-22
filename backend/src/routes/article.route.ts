import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import ArticleController from '../controllers/article.controller';
const articleController = new ArticleController();
const articleRouter = express.Router();

articleRouter.use(isValidJWTToken);

articleRouter.post('/add', articleController.postArticle);
articleRouter.get('/user/:username', articleController.getArticlesByUser);
articleRouter.get('/:articleId', articleController.getArticleData);
articleRouter.get(
  '/:articleId/thumbnail',
  articleController.getArticleThumbnail,
);
articleRouter.get('/:articleId/voteinfo', articleController.getArticleVoteInfo);
articleRouter.post('/:articleId/edit', articleController.updateArticle);
// articleRouter.post('/:articleId/remove', articleController.deleteArticle);
articleRouter.post('/search', articleController.searchArticle);
articleRouter.get('/:articleId/related', articleController.getRelatedArticles);
// articleRouter.put('/:articleId/edit', articleController.updateArticle);
// <<<<<<< HEAD
articleRouter.delete('/:articleId/remove', articleController.deleteArticle);
articleRouter.post('/:articleId/view', articleController.viewArticle);
articleRouter.post('/:articleId/upvote', articleController.upVoteArticle);
articleRouter.post('/:articleId/downvote', articleController.downVoteArticle);
// =======
// articleRouter.delete('/:articleId/remove', articleController.deleteArticle);
// articleRouter.post('/:articleId/view', articleController.viewArticle);
// articleRouter.post('/:articleId/upvote', articleController.upVoteArticle);
// articleRouter.post('/:articleId/downvote', articleController.downVoteArticle);
// >>>>>>> 7da187ab7fc57d5e3cd52ebfb8e615a722ab6317

export default articleRouter;
