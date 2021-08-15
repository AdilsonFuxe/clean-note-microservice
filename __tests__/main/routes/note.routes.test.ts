import request from 'supertest';
import app from '@src/main/config/app';
import { NoteMongooseModel, MongoHelper } from '@src/infra/db/mongoose';

describe('Post /note', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return 201 post note success', async () => {
    const httpResponse = await request(app)
      .post('/api/v1/note')
      .send({
        title: 'any_title',
        description: 'any_description',
      })
      .expect(201);
    expect(httpResponse.body).toMatchObject(
      expect.objectContaining({
        title: 'any_title',
        description: 'any_description',
      })
    );
  });
});
