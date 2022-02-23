import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const swaggerDocument = YAML.load('./swagger.yaml');

import * as dotenv from 'dotenv';
dotenv.config();

import limiter from './services/rateLimiter';
import indexRouter from './routes/index.route';
import authRouter from './routes/auth.route';
import profileRouter from './routes/profile.route';
import questionRouter from './routes/question.route';
import articleRouter from './routes/article.route';
import fileRouter from './routes/file.route';
import answerRouter from './routes/answer.route';
import commentRouter from './routes/comment.route';
import tagRouter from './routes/tag.route';
import notificationRouter from './routes/notification.route';
import messageRouter from './routes/message.router';

const app = express();

app.use('/auto_uploads', express.static('uploads'));

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// app.use(limiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/question', questionRouter);
app.use('/article', articleRouter);
app.use('/file', fileRouter);
app.use('/answer', answerRouter);
app.use('/comment', commentRouter);
app.use('/tag', tagRouter);
app.use('/notification', notificationRouter);
app.use('/message',messageRouter);
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

export default app;
