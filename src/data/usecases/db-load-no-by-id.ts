import { Note } from '@src/domain/models';
import { LoadNoteById } from '@src/domain/usecases';
import { LoadNoteByIdRepository } from '@src/data/protocols';

export class DbLoadNoteById implements LoadNoteById {
  constructor(
    private readonly loadNoteByIdRepository: LoadNoteByIdRepository
  ) {}

  async loadById(id: string): Promise<Note> {
    const note = await this.loadNoteByIdRepository.loadById(id);
    return note;
  }
}
