import { LoadNotesRepository } from '@src/data/protocols';
import { DbLoadNotes } from '@src/data/usecases';
import { Note } from '@src/domain/models';
import mockDate from 'mockdate';

const mockNotes = (): Note[] => [
  {
    id: 'any_id',
    title: 'any_title',
    description: 'any_description',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockLoadNotesRepository = (): LoadNotesRepository => {
  class LoadNotesRepositoryStub implements LoadNotesRepository {
    async loadAll(): Promise<readonly Note[]> {
      return await Promise.resolve(mockNotes());
    }
  }
  return new LoadNotesRepositoryStub();
};

type SutTypes = {
  sut: DbLoadNotes;
  loadNotesRepositoryStub: LoadNotesRepository;
};

const makeSut = (): SutTypes => {
  const loadNotesRepositoryStub = mockLoadNotesRepository();
  const sut = new DbLoadNotes(loadNotesRepositoryStub);
  return {
    sut,
    loadNotesRepositoryStub,
  };
};

describe('DbLoadNotes UseCase', () => {
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });
  it('Should call LoadNotesRepository', async () => {
    const { sut, loadNotesRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadNotesRepositoryStub, 'loadAll');
    await sut.loadAll();
    expect(loadAllSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call LoadNotesRepository', async () => {
    const { sut, loadNotesRepositoryStub } = makeSut();
    jest
      .spyOn(loadNotesRepositoryStub, 'loadAll')
      .mockRejectedValueOnce(new Error());
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow();
  });

  it('Should return a list of notes on LoadNotesRepository', async () => {
    const { sut } = makeSut();
    const notes = await sut.loadAll();
    expect(notes).toEqual(mockNotes());
  });
});
