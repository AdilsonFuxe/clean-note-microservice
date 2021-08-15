import { Note } from '@src/domain/models';

export interface LoadNoteByIdRepository {
  loadById: (id: string) => Promise<Note>;
}
