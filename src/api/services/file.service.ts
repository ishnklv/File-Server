import FileModel from '../models/file.model';
import { FileAdapter } from '../../libs/file.adapter';
import { FileUploadDto } from '../../shared/types/file-upload.dto';
import { ApiError } from '../utils/api.error';

export class FileService {
  private readonly fileModel: typeof FileModel;
  private readonly fileAdapter: FileAdapter;
  constructor() {
    this.fileModel = FileModel;
    this.fileAdapter = new FileAdapter();
  }

  async upload(payload: FileUploadDto, filename: string) {
    await this.fileAdapter.save(payload.binary, filename);
    return this.fileModel.findOneAndUpdate({
      name: filename,
    }, payload, { upsert: true, new: true })
  }

  async getFile(filename: string) {
    const meta = await this.fileModel.findOne({ name: filename });
    if (!meta) {
      throw new ApiError(404, 'Unable found meta')
    }

    const stream = this.fileAdapter.get(filename);
    if (!stream) {
      throw new ApiError(404, 'Unable found binary file')
    }

    return {
      meta,
      stream,
    }
  }
}
