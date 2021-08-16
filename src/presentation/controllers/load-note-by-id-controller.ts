import { LoadNoteById } from '@src/domain/usecases';
import { notFounError, ok, serverError } from '@src/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';

export class LoadNoteByIdController implements Controller {
  constructor(private readonly loadNoteById: LoadNoteById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const note = await this.loadNoteById.loadById(httpRequest.params.id);
      if (!note) {
        return notFounError('note');
      }
      return ok(note);
    } catch (error) {
      return serverError(error);
    }
  }
}
