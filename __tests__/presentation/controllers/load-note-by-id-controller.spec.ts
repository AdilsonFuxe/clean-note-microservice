import { Note } from '@src/domain/models';
import { LoadNoteById } from '@src/domain/usecases';
import { LoadNoteByIdController } from '@src/presentation/controllers/load-note-by-id-controller';
import { HttpRequest } from '@src/presentation/protocols';
import mockDate from 'mockdate';

const mockNote = (): Note => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockLoadNoteById = (): LoadNoteById => {
  class LoadNoteByIdStub implements LoadNoteById {
    async loadById(): Promise<Note> {
      return await Promise.resolve(mockNote());
    }
  }
  return new LoadNoteByIdStub();
};

type SutTypes = {
  sut: LoadNoteByIdController;
  loadNoteByIdStub: LoadNoteById;
};

const mockHttpRequest = (): HttpRequest => ({
  params: {
    id: 'any_id',
  },
});

const makeSut = (): SutTypes => {
  const loadNoteByIdStub = mockLoadNoteById();
  const sut = new LoadNoteByIdController(loadNoteByIdStub);
  return {
    loadNoteByIdStub,
    sut,
  };
};

describe('LoadNoteByIdController', () => {
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });

  it('Should call LoadNoteById with correct param Id', async () => {
    const { sut, loadNoteByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadNoteByIdStub, 'loadById');
    await sut.handle(mockHttpRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
});
