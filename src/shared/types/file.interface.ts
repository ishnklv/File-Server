import mongoose from 'mongoose';

export enum FileStatus {
  'ACTIVE' = 'active',
  'DELETED' = 'deleted',
}

export interface File extends mongoose.Document{
  _id: mongoose.Schema.Types.ObjectId;

  name: string;

  contentLength: number;

  contentType: number;

  status: FileStatus;

  created: Date;

  updated: Date;
}
