import { NextFunction, Request, Response } from 'express';

export const encodeFile = (req: Request, res: Response, next: NextFunction) => {
  let binary: Buffer = new Buffer('');

  req.on('data', (stream: Uint8Array) => {
    binary = Buffer.concat([binary, stream])
  })

  req.on('end', () => {
    req.body = { binary, contentLength: req.headers['content-length'], contentType: req.headers['content-type'] };
    next();
  })
}
