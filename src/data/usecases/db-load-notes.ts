import { Note } from '@src/domain/models';
import { LoadNotes } from '@src/domain/usecases';
import { LoadNotesRepository } from '../protocols';

export class DbLoadNotes implements LoadNotes {
  constructor(private readonly loadNotesRepository: LoadNotesRepository) {}

  async loadAll(): Promise<readonly Note[]> {
    const notes = await this.loadNotesRepository.loadAll();
    return notes;
  }
}
