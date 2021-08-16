import { RouteTags } from '@src/main/docs/tags';
import { TypeSchema } from '@src/main//docs/types';

export const loadOneNotePath = {
  get: {
    tags: [RouteTags.Note],
    summary: 'API para o usuário Pesquisar por uma nota',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: TypeSchema.String,
        },
      },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/note',
            },
          },
        },
      },
      404: {
        $ref: '#/components/notFoundError',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
