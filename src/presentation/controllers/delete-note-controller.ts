import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import { notFounError, serverError } from '@src/presentation/helpers';
import { LoadNoteById } from '@src/domain/usecases';

export class DeleteNoteController implements Controller {
  constructor(private readonly loadNoteById: LoadNoteById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const note = await this.loadNoteById.loadById(httpRequest.params.id);
      if (!note) {
        return notFounError('note');
      }
      return await Promise.resolve({ statusCode: 200 });
    } catch (error) {
      return serverError(error);
    }
  }
}
