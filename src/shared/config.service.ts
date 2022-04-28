import dotenv from 'dotenv';

export class ConfigService {
  constructor() {
    this.init();
  }

  private init() {
    dotenv.config();
  }

  public getEnv(variable: string): string | undefined {
    return process.env[variable];
  }
}
