import { FileController } from '../controllers/file.controller';
import { Request, Response, Router } from 'express';
import { encodeFile } from '../middlewares/encode.file';

const router: Router = Router();
const fileController = new FileController();

router.put('/files/:filename', encodeFile, (req, res) => fileController.upload(req, res));
router.get('/files/:filename', (req: Request, res: Response) => fileController.getFile(req, res));

export default router;
