import { LoadNotes } from '@src/domain/usecases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import { ok, serverError } from '@src/presentation/helpers';

export class LoadNotesController implements Controller {
  constructor(private readonly loadNotes: LoadNotes) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const notes = await this.loadNotes.loadAll();
      return ok(notes);
    } catch (error) {
      return serverError(error);
    }
  }
}
