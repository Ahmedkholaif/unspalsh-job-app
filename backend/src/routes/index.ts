import express, { Request, Response } from 'express';
import jobsRouter from './jobRoutes';

const v1Router = express.Router();
export default function routes(app: any) {
  app.use('/api/v1', v1Router);
  v1Router.use('/jobs', jobsRouter);
}
