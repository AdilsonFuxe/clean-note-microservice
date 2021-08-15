import { Note } from '@src/domain/models';
import { LoadNotes } from '@src/domain/usecases';
import { LoadNotesController } from '@src/presentation/controllers/load-notes-contoller';
import { ok, serverError } from '@src/presentation/helpers';
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
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });

  it('Should call LoadNotes', async () => {
    const { sut, loadNotesStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadNotesStub, 'loadAll');
    await sut.handle({});
    expect(loadAllSpy).toHaveBeenCalledTimes(1);
  });

  it('Should return 500 if LoadNotes throw', async () => {
    const { sut, loadNotesStub } = makeSut();
    jest.spyOn(loadNotesStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 200 on loadAll success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(mockNotes()));
  });
});
