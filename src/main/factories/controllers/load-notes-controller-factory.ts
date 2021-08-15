import { Controller } from '@src/presentation/protocols';
import { LoadNotesController } from '@src/presentation/controllers/load-notes-contoller';
import { makeDbLoadNotes } from '@src/main/factories/usecases/db-load-notes-factory';

export const makeLoadNotesController = (): Controller => {
  const controller = new LoadNotesController(makeDbLoadNotes());
  return controller;
};
