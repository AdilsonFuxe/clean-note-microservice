import { Router } from 'express';
import { adaptRoute } from '@src/main/adapters/express-routes-adapter';
import { makeAddNoteController } from '@src/main/factories/controllers/add-note-controller-factory';
import { makeLoadNotesController } from '@src/main/factories/controllers/load-notes-controller-factory';

export default (router: Router): void => {
  router.post('/notes', adaptRoute(makeAddNoteController()));
  router.get('/notes', adaptRoute(makeLoadNotesController()));
};
