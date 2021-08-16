import { TypeSchema } from '@src/main/docs/types';

export const noteSchema = {
  type: TypeSchema.Object,
  properties: {
    id: {
      type: TypeSchema.String,
    },
    title: {
      type: TypeSchema.String,
    },
    descriptiom: {
      type: TypeSchema.String,
    },
    createdAt: {
      type: TypeSchema.String,
    },
    updatedAt: {
      type: TypeSchema.String,
    },
  },
};
