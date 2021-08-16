import {
  addNotePath,
  loadNotesPath,
  loadOneNotePath,
  deleteNotePath,
} from '@src/main/docs/paths';
import {
  badRequest,
  serverError,
  notFoundError,
} from '@src/main/docs/components';

import { noteSchema, addNoteParamsSchema } from '@src/main/docs/schemas';

import { RouteTags } from '@src/main/docs/tags';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Ideafix keep note microservice',
    description: 'API para fazer gestão de notas, para o teste da Ideafix',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api/v1',
    },
  ],
  tags: [{ name: RouteTags.Note }],
  paths: {
    '/notes': {
      ...addNotePath,
      ...loadNotesPath,
    },
    '/notes/{id}': {
      ...loadOneNotePath,
      ...deleteNotePath,
    },
  },
  schemas: {
    note: noteSchema,
    addNoteParams: addNoteParamsSchema,
  },
  components: {
    badRequest,
    serverError,
    notFoundError,
  },
};
