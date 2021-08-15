import { AddNoteController } from '@src/presentation/controllers';
import { Controller } from '@src/presentation/protocols';
import { makeDbAddNote } from '@src/main/factories/usecases/db-add-note-factory';

export const makeAddNoteController = (): Controller => {
  const controller = new AddNoteController(makeDbAddNote());
  return controller;
};
