import { AddNoteRepository } from '@src/data/protocols';
import { Note } from '@src/domain/models';
import { AddNoteParams } from '@src/domain/usecases';
import { NoteMongooseModel, MongoHelper } from '@src/infra/db/mongoose';

export class NoteMongoRepository implements AddNoteRepository {
  async add(params: AddNoteParams): Promise<Note> {
    const doc = new NoteMongooseModel(params);
    await doc.save();
    const parsedDoc = JSON.parse(JSON.stringify(doc));
    return MongoHelper.serialize(parsedDoc);
  }
}
