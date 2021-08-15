import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import { badRequest, serverError } from '@src/presentation/helpers';
import { MissingParamError } from '../errors';

export class AddNoteController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      for (const field of ['title', 'description']) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field));
      }
      return await Promise.resolve({ statusCode: 200 });
    } catch (error) {
      return serverError(error);
    }
  }
}
