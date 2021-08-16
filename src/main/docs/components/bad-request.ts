import { TypeSchema } from '@src/main/docs/types';

export const badRequest = {
  description: 'Invalid Request',
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
