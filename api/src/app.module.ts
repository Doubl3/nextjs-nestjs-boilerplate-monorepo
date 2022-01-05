/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiAccessCheck } from './middlewares/ApiAccessCheck.middleware';

import { UserModule } from './user/user.module';


@Module({
  imports: [
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiAccessCheck)
      .forRoutes('/v1');
  }
}
