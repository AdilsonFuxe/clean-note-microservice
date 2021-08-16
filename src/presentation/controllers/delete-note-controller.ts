import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import { serverError } from '@src/presentation/helpers';
import { LoadNoteById } from '@src/domain/usecases';

export class DeleteNoteController implements Controller {
  constructor(private readonly loadNoteById: LoadNoteById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadNoteById.loadById(httpRequest.params.id);
      return await Promise.resolve({ statusCode: 200 });
    } catch (error) {
      return serverError(error);
    }
  }
}
