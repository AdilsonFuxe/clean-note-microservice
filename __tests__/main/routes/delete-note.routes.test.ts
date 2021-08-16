import request from 'supertest';
import app from '@src/main/config/app';
import { NoteMongooseModel, MongoHelper } from '@src/infra/db/mongoose';
import { Types } from 'mongoose';

describe('Delete /notes/:id', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await NoteMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return 404 on delete note fails', async () => {
    await request(app)
      .delete(`/api/v1/notes/${Types.ObjectId().toHexString()}`)
      .expect(404);
  });

  it('Should return 204 on on delete note success', async () => {
    const savedNote = await NoteMongooseModel.create({
      title: 'title2',
      description: 'description2',
    });
    await request(app)
      .delete(`/api/v1/notes/${savedNote.id as string}`)
      .expect(204);
    const findNote = await NoteMongooseModel.findById(savedNote.id);
    expect(findNote).toBeFalsy();
  });
});
