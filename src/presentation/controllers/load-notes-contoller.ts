import { LoadNotes } from '@src/domain/usecases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import { serverError } from '../helpers';

export class LoadNotesController implements Controller {
  constructor(private readonly loadNotes: LoadNotes) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadNotes.loadAll();
      return await Promise.resolve({ statusCode: 200 });
    } catch (error) {
      return serverError(error);
    }
  }
}
