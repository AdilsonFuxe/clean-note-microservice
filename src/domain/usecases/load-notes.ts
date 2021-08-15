import { Note } from '@src/domain/models';

export interface LoadNotes {
  loadAll: () => Promise<readonly Note[]>;
}
