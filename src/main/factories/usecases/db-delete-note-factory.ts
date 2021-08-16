import { DbDeleteNote } from '@src/data/usecases';
import { DeleteNote } from '@src/domain/usecases';
import { NoteMongoRepository } from '@src/infra/db/mongoose';

export const makeDbDeleteNote = (): DeleteNote => {
  const noteRepository = new NoteMongoRepository();
  return new DbDeleteNote(noteRepository);
};
