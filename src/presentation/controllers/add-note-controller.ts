import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import { badRequest, serverError } from '@src/presentation/helpers';
import { MissingParamError } from '@src/presentation/errors';
import { AddNote } from '@src/domain/usecases';

export class AddNoteController implements Controller {
  constructor(private readonly addNote: AddNote) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      for (const field of ['title', 'description']) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field));
      }
      const { title, description } = httpRequest.body;
      await this.addNote.add({ title, description });
      return await Promise.resolve({ statusCode: 200 });
    } catch (error) {
      return serverError(error);
    }
  }
}
