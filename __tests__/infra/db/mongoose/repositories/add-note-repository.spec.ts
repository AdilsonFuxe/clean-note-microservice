import {
  MongoHelper,
  NoteMongooseModel,
  NoteMongoRepository,
} from '@src/infra/db/mongoose';

describe('AddNoteRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(`${process.env.MONGO_URL}`);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should returna a note on add success', async () => {
    const sut = new NoteMongoRepository();
    const note = await sut.add({
      title: 'any_title',
      description: 'any_description',
    });
    expect(note).toBeTruthy();
    expect(note.id).toBeTruthy();
    expect(note.title).toBe('any_title');
    expect(note.description).toBe('any_description');
  });
});
