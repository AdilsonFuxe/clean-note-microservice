import { Controller } from '@src/presentation/protocols';
import { DeleteNoteController } from '@src/presentation/controllers';
import { makeDbLoadNoteById } from '@src/main/factories/usecases/db-load-note-by-id-factory';
import { makeDbDeleteNote } from '@src/main/factories/usecases/db-delete-note-factory';

export const makeDeleteNoteController = (): Controller => {
  const controller = new DeleteNoteController(
    makeDbLoadNoteById(),
    makeDbDeleteNote()
  );
  return controller;
};
