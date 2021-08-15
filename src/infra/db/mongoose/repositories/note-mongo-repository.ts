import { AddNoteRepository, LoadNotesRepository } from '@src/data/protocols';
import { Note } from '@src/domain/models';
import { AddNoteParams } from '@src/domain/usecases';
import { NoteMongooseModel, MongoHelper } from '@src/infra/db/mongoose';

export class NoteMongoRepository
  implements AddNoteRepository, LoadNotesRepository
{
  async add(params: AddNoteParams): Promise<Note> {
    const doc = new NoteMongooseModel(params);
    await doc.save();
    const parsedDoc = JSON.parse(JSON.stringify(doc));
    return MongoHelper.serialize(parsedDoc);
  }

  async loadAll(): Promise<readonly Note[]> {
    const notes = await NoteMongooseModel.find().lean();
    const serializedNotes = notes.map(MongoHelper.serialize);
    return serializedNotes;
  }
}
