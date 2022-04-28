import * as fs from 'fs';
import { join } from 'path';
import { WriteStream } from 'fs';
import { directorySize } from '../shared/utils';

export class FileAdapter {

  constructor() {
    this.init();
  }

  init() {
    const fileDir = join(__dirname, '..', 'data');
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
  }

  public filePath(filename: string) {
    return join(__dirname, '..', 'data', filename);
  }

  async save(data: BinaryData, filename: string) {
    try {
      console.log('File saving started')
      const filePath = this.filePath(filename);
      const stream: WriteStream = fs.createWriteStream(filePath);
      console.log('File saving finished')
      const size = await directorySize(join(__dirname, '..', 'data'));
      if (parseInt((size / 1048576).toFixed(2)) > 10) {
        console.warn('Directory exceeded limit 10mb');
      }
      stream.write(data);
    } catch (err) {
      console.log('Error', err);
    }
  }

  get(filename: string) {
    try {
      return fs.createReadStream(join(__dirname, '..', 'data', filename));
    } catch (err) {
      console.log('Error', err);
    }
  }
}
