import { TypeSchema } from '@src/main/docs/types';

export const notFoundError = {
  description: 'Not Found Error',
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
