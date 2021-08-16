import { DeleteNote } from '@src/domain/usecases';
import { DeleteNoteRepository } from '@src/data/protocols';

export class DbDeleteNote implements DeleteNote {
  constructor(private readonly deleteNoteRepository: DeleteNoteRepository) {}

  async delete(id: string): Promise<void> {
    await this.deleteNoteRepository.delete(id);
  }
}
