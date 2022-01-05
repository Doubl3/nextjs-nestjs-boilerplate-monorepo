import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class AppService {
  private logger: Logger = new Logger(AppService.name);

  constructor() {}


  getHello(): string {
    return 'Hello from the API';
  }

  async getLivenessProbeInformation(): Promise<string> {
    return '';
  }
}
