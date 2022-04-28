import { FileService } from '../services/file.service';
import { Request, Response } from 'express';
import { File } from '../../shared/types/file.interface';
import { Stream } from 'stream';

export class FileController {
  private readonly fileService: FileService
  constructor() {
    this.fileService = new FileService();
  }

  async upload(req: Request, res: Response) {
    try {
      const filename = req.params.filename;
      const file = await this.fileService.upload(req.body, filename);
      return res.json(file);
    } catch (err) {
      res.json(err)
    }
  }

  async getFile(req: Request, res: Response) {
    try {
      const filename = req.params.filename;
      const file: { meta: File, stream: Stream } = await this.fileService.getFile(filename);
      res.setHeader('content-type', file.meta.contentType)
      res.setHeader('content-length', file.meta.contentLength);
      file.stream.pipe(res);
    } catch (err) {
      res.json(err);
    }
  }
}
