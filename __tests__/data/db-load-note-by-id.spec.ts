import { LoadNoteByIdRepository } from '@src/data/protocols';
import { DbLoadNoteById } from '@src/data/usecases';
import { Note } from '@src/domain/models';
import mockDate from 'mockdate';

const mockNote = (): Note => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockLoadNoteByIdRepository = (): LoadNoteByIdRepository => {
  class LoadNoteByIdRepositoryStub implements LoadNoteByIdRepository {
    async loadById(): Promise<Note> {
      return await Promise.resolve(mockNote());
    }
  }
  return new LoadNoteByIdRepositoryStub();
};

type SutTypes = {
  sut: DbLoadNoteById;
  loadNoteByIdRepositoryStub: LoadNoteByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadNoteByIdRepositoryStub = mockLoadNoteByIdRepository();
  const sut = new DbLoadNoteById(loadNoteByIdRepositoryStub);
  return {
    sut,
    loadNoteByIdRepositoryStub,
  };
};

describe('DbLoadNoteById UseCase', () => {
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });

  it('Should call LoadNoteByIdRepository with correct id', async () => {
    const { sut, loadNoteByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadNoteByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should throw if LoadNoteByIdRepository throws', async () => {
    const { sut, loadNoteByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadNoteByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error());
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should return a note on LoadNoteByIdRepository success', async () => {
    const { sut } = makeSut();
    const note = await sut.loadById('any_id');
    expect(note).toEqual(mockNote());
  });
});
