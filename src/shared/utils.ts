import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export const directorySize = async (dir: string) => {
  const files = await readdir(dir);
  const stats = files.map((file) => stat(join(dir, file)));

  return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}
