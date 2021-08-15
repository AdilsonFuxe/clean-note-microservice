import { Note } from '@src/domain/models';
import { Document, Model } from 'mongoose';

export type NoteDocument = Note &
  Document & {
    id: Document['_id'];
  };

export type NoteMongooseModel = Model<NoteDocument> & {
  id: Document['_id'];
};

export enum Schemas {
  notes = 'Notes',
}
