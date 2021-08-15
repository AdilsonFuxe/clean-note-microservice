import { Note } from '@src/domain/models';

export interface AddNoteParams {
  title: string;
  description: string;
}

export interface AddNote {
  add: (parms: AddNoteParams) => Promise<Note>;
}
