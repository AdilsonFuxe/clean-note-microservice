import { Controller } from '@src/presentation/protocols';
import { LoadNoteByIdController } from '@src/presentation/controllers';
import { makeDbLoadNoteById } from '@src/main/factories/usecases/db-load-note-by-id-factory';

export const makeLoadNoteByIdController = (): Controller => {
  const controller = new LoadNoteByIdController(makeDbLoadNoteById());
  return controller;
};
