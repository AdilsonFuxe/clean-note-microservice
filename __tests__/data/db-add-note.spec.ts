import { AddNoteRepository } from '@src/data/protocols/add-note-repository';
import { DbAddNote } from '@src/data/usecases';
import { Note } from '@src/domain/models';
import { AddNoteParams } from '@src/domain/usecases';

describe('DbAddNote UseCase', () => {
  it('Should call AddNoteRepository with corret values', async () => {
    class AddNoteRepositoryStub implements AddNoteRepository {
      async add(parms: AddNoteParams): Promise<Note> {
        return await Promise.resolve({
          id: 'any_id',
          title: 'any_title',
          description: 'any_description',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    const addNoteRepositoryStub = new AddNoteRepositoryStub();
    const addSpy = jest.spyOn(addNoteRepositoryStub, 'add');
    const sut = new DbAddNote(addNoteRepositoryStub);
    const params = {
      title: 'any_title',
      description: 'any_sercription',
    };
    await sut.add(params);
    expect(addSpy).toHaveBeenCalledWith(params);
  });
});
