import {
  MongoHelper,
  NoteMongooseModel,
  NoteMongoRepository,
} from '@src/infra/db/mongoose';
import { Types } from 'mongoose';

describe('LoadNotebyIdRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(`${process.env.MONGO_URL}`);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return null if loadById fails', async () => {
    const sut = new NoteMongoRepository();
    const note = await sut.loadById(Types.ObjectId().toHexString());
    expect(note).toBeNull();
  });

  it('Should return a note on loadById success', async () => {
    const savedNote = await NoteMongooseModel.create({
      title: 'any_title',
      description: 'any_description',
    });
    const sut = new NoteMongoRepository();
    const note = await sut.loadById(savedNote.id);
    expect(note).toBeTruthy();
    expect(note).toEqual(
      expect.objectContaining({
        title: 'any_title',
        description: 'any_description',
      })
    );
  });
});
