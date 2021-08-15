import { Note } from '@src/domain/models';
import { LoadNotes } from '@src/domain/usecases';
import { LoadNotesController } from '@src/presentation/controllers/load-notes-contoller';

const mockNotes = (): Note[] => [
  {
    id: 'any_id',
    title: 'any_title',
    description: 'any_description',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockLoadNotes = (): LoadNotes => {
  class LoadNotesStub implements LoadNotes {
    async loadAll(): Promise<readonly Note[]> {
      return await Promise.resolve(mockNotes());
    }
  }
  return new LoadNotesStub();
};

type SutTypes = {
  sut: LoadNotesController;
  loadNotesStub: LoadNotes;
};

const makeSut = (): SutTypes => {
  const loadNotesStub = mockLoadNotes();
  const sut = new LoadNotesController(loadNotesStub);
  return {
    loadNotesStub,
    sut,
  };
};

describe('LoadNotesController', () => {
  it('Should call LoadNotes', async () => {
    const { sut, loadNotesStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadNotesStub, 'loadAll');
    await sut.handle({});
    expect(loadAllSpy).toHaveBeenCalledTimes(1);
  });
});
