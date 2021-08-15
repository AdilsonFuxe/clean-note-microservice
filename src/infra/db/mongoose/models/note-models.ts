import { model, Schema } from 'mongoose';
import { NoteDocument, NoteMongooseModel, Schemas } from './models-protocols';

const NoteSchema = new Schema<NoteDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model<NoteDocument, NoteMongooseModel>(
  Schemas.notes,
  NoteSchema
);
