import { DbLoadNotes } from '@src/data/usecases';
import { LoadNotes } from '@src/domain/usecases';
import { NoteMongoRepository } from '@src/infra/db/mongoose';

export const makeDbLoadNotes = (): LoadNotes => {
  const noteRepository = new NoteMongoRepository();
  return new DbLoadNotes(noteRepository);
};
