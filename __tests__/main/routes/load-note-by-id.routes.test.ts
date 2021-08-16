import request from 'supertest';
import app from '@src/main/config/app';
import { NoteMongooseModel, MongoHelper } from '@src/infra/db/mongoose';

describe('Get /notes/:id', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return 200 on get note success', async () => {
    const savedNote = await NoteMongooseModel.create({
      title: 'title2',
      description: 'description2',
    });
    const httpResponse = await request(app)
      .get(`/api/v1/notes/${savedNote.id as string}`)
      .expect(200);
    expect(httpResponse.body).toEqual(
      expect.objectContaining({
        title: 'title2',
        description: 'description2',
      })
    );
  });
});
