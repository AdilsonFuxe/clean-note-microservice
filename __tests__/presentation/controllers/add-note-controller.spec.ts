import { Note } from '@src/domain/models';
import { AddNote } from '@src/domain/usecases';
import { AddNoteController } from '@src/presentation/controllers';
import { MissingParamError } from '@src/presentation/errors';
import { badRequest, created, serverError } from '@src/presentation/helpers';
import { HttpRequest } from '@src/presentation/protocols';

const mockNote = (): Note => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockAddNote = (): AddNote => {
  class AddNoteStub implements AddNote {
    async add(): Promise<Note> {
      return await Promise.resolve(mockNote());
    }
  }
  return new AddNoteStub();
};

type SutTypes = {
  sut: AddNoteController;
  addNoteStub: AddNote;
};

const mockHttpRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    description: 'any_description',
  },
});

const makeSut = (): SutTypes => {
  const addNoteStub = mockAddNote();
  const sut = new AddNoteController(addNoteStub);
  return {
    addNoteStub,
    sut,
  };
};

describe('AddNoteController', () => {
  it('Should return 400 if title is not provided in http request body', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {
        description: 'any_description',
      },
    });
    expect(httpResponse).toEqual(badRequest(new MissingParamError('title')));
  });

  it('Should return 400 if description is not provided in http request body', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {
        title: 'any_title',
      },
    });
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('description'))
    );
  });

  it('Should call AddNote with correct values', async () => {
    const { sut, addNoteStub } = makeSut();
    const addSpy = jest.spyOn(addNoteStub, 'add');
    const httpRequest = mockHttpRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 500 if AddNote throws', async () => {
    const { sut, addNoteStub } = makeSut();
    jest.spyOn(addNoteStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 201 with the new note on AddNote success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(created(mockNote()));
  });
});
