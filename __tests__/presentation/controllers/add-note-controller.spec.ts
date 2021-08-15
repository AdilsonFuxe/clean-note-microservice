import { AddNoteController } from '@src/presentation/controllers';
import { MissingParamError } from '@src/presentation/errors';
import { badRequest } from '@src/presentation/helpers';

describe('AddNoteController', () => {
  it('Should return 400 if title is not provided in http request body', async () => {
    const sut = new AddNoteController();
    const httpResponse = await sut.handle({
      body: {
        description: 'any_description',
      },
    });
    expect(httpResponse).toEqual(badRequest(new MissingParamError('title')));
  });

  it('Should return 400 if description is not provided in http request body', async () => {
    const sut = new AddNoteController();
    const httpResponse = await sut.handle({
      body: {
        title: 'any_title',
      },
    });
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('description'))
    );
  });
});
