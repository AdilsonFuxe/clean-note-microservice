import {
  MongoHelper,
  NoteMongooseModel,
  NoteMongoRepository,
} from '@src/infra/db/mongoose';

describe('LoadNotesRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(`${process.env.MONGO_URL}`);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return a list of note on loadAll success', async () => {
    await NoteMongooseModel.create([
      { title: 'title1', description: 'description1' },
      { title: 'title2', description: 'description2' },
    ]);
    const sut = new NoteMongoRepository();
    const note = await sut.loadAll();
    expect(note).toBeTruthy();
    expect(note.length).toBe(2);
  });
});
