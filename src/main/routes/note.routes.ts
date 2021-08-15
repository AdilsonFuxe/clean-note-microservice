import { Router } from 'express';
import { adaptRoute } from '@src/main/adapters/express-routes-adapter';
import { makeAddNoteController } from '@src/main/factories/controllers/add-note-controller-factory';

export default (router: Router): void => {
  router.post('/note', adaptRoute(makeAddNoteController()));
};
