import { Note } from '@src/domain/models';

export interface LoadNotesRepository {
  loadAll: () => Promise<readonly Note[]>;
}
