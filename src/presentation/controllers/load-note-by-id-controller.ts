import { LoadNoteById } from '@src/domain/usecases';
import { serverError } from '@src/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';

export class LoadNoteByIdController implements Controller {
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
