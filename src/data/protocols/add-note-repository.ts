import { Note } from '@src/domain/models';
import { AddNoteParams } from '@src/domain/usecases';

export interface AddNoteRepository {
  add: (parms: AddNoteParams) => Promise<Note>;
}
