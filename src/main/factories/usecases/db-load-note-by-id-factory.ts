import { DbLoadNoteById } from '@src/data/usecases';
import { LoadNoteById } from '@src/domain/usecases';
import { NoteMongoRepository } from '@src/infra/db/mongoose';

export const makeDbLoadNoteById = (): LoadNoteById => {
  const noteRepository = new NoteMongoRepository();
  return new DbLoadNoteById(noteRepository);
};
