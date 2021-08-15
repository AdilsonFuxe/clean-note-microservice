import request from 'supertest';
import app from '@src/main/config/app';
import { NoteMongooseModel, MongoHelper } from '@src/infra/db/mongoose';

describe('Get /notes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return 200 on get notes success', async () => {
    await NoteMongooseModel.create([
      { title: 'title1', description: 'description1' },
      { title: 'title2', description: 'description2' },
    ]);
    const httpResponse = await request(app).get('/api/v1/notes').expect(200);
    expect(httpResponse.body.length).toBe(2);
  });
});
