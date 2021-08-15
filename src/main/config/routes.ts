import { Express, Router } from 'express';
import noteRouter from '@src/main/routes/note.routes';

export default (app: Express): void => {
  const router = Router();
  noteRouter(router);
  app.use('/api/v1', router);
};
