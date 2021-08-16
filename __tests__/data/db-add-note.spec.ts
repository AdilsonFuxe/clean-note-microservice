import { AddNoteRepository } from '@src/data/protocols/add-note-repository';
import { DbAddNote } from '@src/data/usecases';
import { Note } from '@src/domain/models';
import { AddNoteParams } from '@src/domain/usecases';
import mockDate from 'mockdate';

const mockNote = (): Note => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockAddNoteParams = (): AddNoteParams => ({
  title: 'any_title',
  description: 'any_sercription',
});

const mockAddNoteRepository = (): AddNoteRepository => {
  class AddNoteRepositoryStub implements AddNoteRepository {
    async add(): Promise<Note> {
      return await Promise.resolve(mockNote());
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
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });
  it('Should call AddNoteRepository with corret values', async () => {
    const { sut, addNoteRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addNoteRepositoryStub, 'add');
    const params = mockAddNoteParams();
    await sut.add(params);
    expect(addSpy).toHaveBeenCalledWith(params);
  });

  it('Should return a note on AddNoteRepository success', async () => {
    const { sut } = makeSut();
    const note = await sut.add(mockAddNoteParams());
    expect(note).toEqual(mockNote());
  });

  it('Should throw if AddNoteRepository throw', async () => {
    const { sut, addNoteRepositoryStub } = makeSut();
    jest.spyOn(addNoteRepositoryStub, 'add').mockRejectedValueOnce(new Error());
    const promise = sut.add(mockAddNoteParams());
    await expect(promise).rejects.toThrow();
  });
});
