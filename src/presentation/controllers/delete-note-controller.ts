import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import {
  noContent,
  notFounError,
  serverError,
} from '@src/presentation/helpers';
import { DeleteNote, LoadNoteById } from '@src/domain/usecases';

export class DeleteNoteController implements Controller {
  constructor(
    private readonly loadNoteById: LoadNoteById,
    private readonly deleteNote: DeleteNote
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const note = await this.loadNoteById.loadById(httpRequest.params.id);
      if (!note) {
        return notFounError('note');
      }
      await this.deleteNote.delete(httpRequest.params.id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
