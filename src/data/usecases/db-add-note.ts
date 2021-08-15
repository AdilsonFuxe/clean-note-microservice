import { Note } from '@src/domain/models';
import { AddNote, AddNoteParams } from '@src/domain/usecases';
import { AddNoteRepository } from '@src/data/protocols';

export class DbAddNote implements AddNote {
  constructor(private readonly addNoteRepository: AddNoteRepository) {}

  async add(parms: AddNoteParams): Promise<Note> {
    const note = await this.addNoteRepository.add(parms);
    return note;
  }
}
