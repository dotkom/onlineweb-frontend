import { Router } from 'express';
import officeRouter from 'office/backend/router';

export const apiRouter = Router();

apiRouter.use(officeRouter);
