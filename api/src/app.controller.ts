import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  sayHello() {
    return { result: this.appService.getHello() };
  }

  @Get('/livenessprobe')
  async getLivenessProbe() {
    const isAliveStatus = await this.appService.getLivenessProbeInformation();
    return { result: isAliveStatus };
  }

  @Get('/v1/protected-service')
  async getProtectedServiceResponse() {
    return { result: 'protected content returned' };
  }
}
