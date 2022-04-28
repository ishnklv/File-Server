import * as mongoose from 'mongoose';
import { File } from '../../shared/types/file.interface';

const schema: mongoose.Schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },

  name: {
    type: String,
  },

  contentLength: {
    type: Number,
    required: true,
  },

  contentType: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: [
      'active',
      'deleted',
    ],
    default: 'active',
  },

  created: {
    type: Date,
    default: () => new Date(),
  },

  updated: {
    type: Date,
    default: () => new Date(),
  }
})

export default mongoose.model<File>('file', schema);
