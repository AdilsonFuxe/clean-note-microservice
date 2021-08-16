import { RouteTags } from '@src/main/docs/tags';

export const addNotePath = {
  post: {
    tags: [RouteTags.Note],
    summary: 'API para o usuário Adicionar uma nova nota',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addNoteParams',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/note',
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
