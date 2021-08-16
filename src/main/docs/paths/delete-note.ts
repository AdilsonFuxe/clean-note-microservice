import { RouteTags } from '@src/main/docs/tags';
import { TypeSchema } from '@src/main/docs/types';

export const deleteNotePath = {
  delete: {
    tags: [RouteTags.Note],
    summary: 'API para o usuário Deleterar uma  notass',
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
      204: {
        description: 'Not Content',
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
