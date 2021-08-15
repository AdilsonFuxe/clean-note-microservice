import { AddNoteRepository } from '@src/data/protocols/add-note-repository';
import { DbAddNote } from '@src/data/usecases';
import { Note } from '@src/domain/models';
import { AddNoteParams } from '@src/domain/usecases';

const mockAddNoteRepository = (): AddNoteRepository => {
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
  return new AddNoteRepositoryStub();
};

interface SutTypes {
  sut: DbAddNote;
  addNoteRepositoryStub: AddNoteRepository;
}

const makeSut = (): SutTypes => {
  const addNoteRepositoryStub = mockAddNoteRepository();
  const sut = new DbAddNote(addNoteRepositoryStub);
  return { sut, addNoteRepositoryStub };
};

describe('DbAddNote UseCase', () => {
  it('Should call AddNoteRepository with corret values', async () => {
    const { sut, addNoteRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addNoteRepositoryStub, 'add');
    const params = {
      title: 'any_title',
      description: 'any_sercription',
    };
    await sut.add(params);
    expect(addSpy).toHaveBeenCalledWith(params);
  });
});
