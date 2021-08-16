import { RouteTags } from '@src/main/docs/tags';
import { TypeSchema } from '@src/main//docs/types';

export const loadNotesPath = {
  get: {
    tags: [RouteTags.Note],
    summary: 'API para o usuário listar todas notas',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: TypeSchema.Array,
              items: { $ref: '#/schemas/note' },
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
