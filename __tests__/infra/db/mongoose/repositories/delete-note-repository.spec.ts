import {
  MongoHelper,
  NoteMongooseModel,
  NoteMongoRepository,
} from '@src/infra/db/mongoose';

describe('DeleteNOteRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(`${process.env.MONGO_URL}`);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should delete a note on delete success', async () => {
    const savedNote = await NoteMongooseModel.create({
      title: 'any_title',
      description: 'any_description',
    });
    const sut = new NoteMongoRepository();
    await sut.delete(savedNote.id);
    const findNote = await NoteMongooseModel.findById(savedNote.id);
    expect(findNote).toBeFalsy();
  });
});
