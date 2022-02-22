import express, { Router } from 'express';

// <<<<<<< HEAD
import {
  helloWorld,
  test,
  topPosts,
  topTags,
  topArticles,
  topQuestions,
} from '../controllers/index.controller';
const indexRouter: Router = express.Router();

/* GET home page. */
indexRouter.get('/topPosts', topPosts);
indexRouter.get('/topQuestions', topQuestions);
indexRouter.get('/topArticles', topArticles);
indexRouter.get('/topTags', topTags);
// =======
// import { helloWorld, test, topPosts } from '../controllers/index.controller';
// const indexRouter: Router = express.Router();

// /* GET home page. */
// indexRouter.get('/', topPosts);
// >>>>>>> 7da187ab7fc57d5e3cd52ebfb8e615a722ab6317
// // indexRouter.post('/search', search );
indexRouter.get('/get/:id', test);

export default indexRouter;
