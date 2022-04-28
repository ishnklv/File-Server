import express, { Express } from 'express';
import { connectMongoDB } from './api/db/database';
import fileRouter from './api/routes/file.router';
import { ConfigService } from './shared/config.service';

const main = async (): Promise<void> => {
  const app: Express = express();
  const config = new ConfigService();
  const PORT = config.getEnv('PORT') || 4444;
  // Connected the file controller
  app.use(fileRouter);
  app.use(express.json());
  // Connected the mongodb
  await connectMongoDB();
  app.listen(PORT, () => console.log('Application listening on PORT = ', PORT));
}

main();
