import { Note } from '@src/domain/models';

export interface LoadNoteById {
  loadById: (id: string) => Promise<Note>;
}
