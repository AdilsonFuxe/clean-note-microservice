import { TypeSchema } from '@src/main/docs/types';

export const addNoteParamsSchema = {
  type: TypeSchema.Object,
  properties: {
    title: {
      type: TypeSchema.String,
    },
    description: {
      type: TypeSchema.String,
    },
  },
  required: ['title', 'description'],
};
