import { TypeSchema } from '@src/main/docs/types';

export const serverError = {
  description: 'Internal Server Error',
  content: {
    'application/json:': {
      schema: {
        type: TypeSchema.Object,
        properties: {
          error: {
            type: TypeSchema.String,
          },
        },
      },
    },
  },
};
