import { DbAddNote } from '@src/data/usecases';
import { AddNote } from '@src/domain/usecases';
import { NoteMongoRepository } from '@src/infra/db/mongoose';

export const makeDbAddNote = (): AddNote => {
  const noteRepository = new NoteMongoRepository();
  return new DbAddNote(noteRepository);
};
