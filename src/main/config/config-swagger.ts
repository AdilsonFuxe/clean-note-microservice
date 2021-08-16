import { noCache } from '@src/main/middlewares/no-cache';
import { serve, setup } from 'swagger-ui-express';
import { Express } from 'express';
import swaggerConfig from '@src/main/docs';

export default (app: Express): void => {
  app.use('/api/v1/docs', noCache, serve, setup(swaggerConfig));
};
