import { Router } from 'express';
import { adaptRoute } from '@src/main/adapters/express-routes-adapter';
import {
  makeAddNoteController,
  makeDeleteNoteController,
  makeLoadNoteByIdController,
  makeLoadNotesController,
} from '@src/main/factories/controllers';

export default (router: Router): void => {
  router.post('/notes', adaptRoute(makeAddNoteController()));
  router.get('/notes', adaptRoute(makeLoadNotesController()));
  router.get('/notes/:id', adaptRoute(makeLoadNoteByIdController()));
  router.delete('/notes/:id', adaptRoute(makeDeleteNoteController()));
};
