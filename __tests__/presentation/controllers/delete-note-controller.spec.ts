import { Note } from '@src/domain/models';
import { DeleteNote, LoadNoteById } from '@src/domain/usecases';
import { DeleteNoteController } from '@src/presentation/controllers';
import {
  noContent,
  notFounError,
  serverError,
} from '@src/presentation/helpers';
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

const mockDeleteNote = (): DeleteNote => {
  class DeleteNoteStub implements DeleteNote {
    async delete(): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new DeleteNoteStub();
};

type SutTypes = {
  sut: DeleteNoteController;
  loadNoteByIdStub: LoadNoteById;
  deleteNoteStub: DeleteNote;
};

const mockHttpRequest = (): HttpRequest => ({
  params: {
    id: 'any_id',
  },
});

const makeSut = (): SutTypes => {
  const loadNoteByIdStub = mockLoadNoteById();
  const deleteNoteStub = mockDeleteNote();
  const sut = new DeleteNoteController(loadNoteByIdStub, deleteNoteStub);
  return {
    sut,
    loadNoteByIdStub,
    deleteNoteStub,
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

  it('Should return 500 if LoadNoteById throw', async () => {
    const { sut, loadNoteByIdStub } = makeSut();
    jest.spyOn(loadNoteByIdStub, 'loadById').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call DeleteNote with correct param Id', async () => {
    const { sut, deleteNoteStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteNoteStub, 'delete');
    await sut.handle(mockHttpRequest());
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should 204 on DeleteNote success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if DeleteNote throw', async () => {
    const { sut, deleteNoteStub } = makeSut();
    jest.spyOn(deleteNoteStub, 'delete').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
