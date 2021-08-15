import { LoadNotesRepository } from '@src/data/protocols';
import { DbLoadNotes } from '@src/data/usecases';
import { Note } from '@src/domain/models';

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

describe('DbLoadNotes UseCase', () => {
  it('Should call LoadNotesRepository', async () => {
    const loadNotesRepositoryStub = mockLoadNotesRepository();
    const loadAllSpy = jest.spyOn(loadNotesRepositoryStub, 'loadAll');
    const sut = new DbLoadNotes(loadNotesRepositoryStub);
    await sut.loadAll();
    expect(loadAllSpy).toHaveBeenCalledTimes(1);
  });
});
