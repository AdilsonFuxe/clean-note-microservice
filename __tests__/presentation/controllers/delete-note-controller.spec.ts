import { Note } from '@src/domain/models';
import { LoadNoteById } from '@src/domain/usecases';
import { DeleteNoteController } from '@src/presentation/controllers';
import { notFounError, serverError } from '@src/presentation/helpers';
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
  sut: DeleteNoteController;
  loadNoteByIdStub: LoadNoteById;
};

const mockHttpRequest = (): HttpRequest => ({
  params: {
    id: 'any_id',
  },
});

const makeSut = (): SutTypes => {
  const loadNoteByIdStub = mockLoadNoteById();
  const sut = new DeleteNoteController(loadNoteByIdStub);
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

  it('Should return 404 LoadNoteById fails', async () => {
    const { sut, loadNoteByIdStub } = makeSut();
    jest
      .spyOn(loadNoteByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(notFounError('note'));
  });

  it('Should return 500 LoadNoteById throw', async () => {
    const { sut, loadNoteByIdStub } = makeSut();
    jest.spyOn(loadNoteByIdStub, 'loadById').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
