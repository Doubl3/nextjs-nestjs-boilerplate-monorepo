import { ConfigModule } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');
ConfigModule.forRoot();

async function bootstrap() {
  const logger: Logger = new Logger('main');

  const serverOptions = {};
  if (process.env.NODE_ENV === 'production') {
    serverOptions['logger'] = ['error', 'warn', 'log'];
  }
  const app: INestApplication = await NestFactory.create(
    AppModule,
    serverOptions,
  );

  const serverPort: string | undefined = process.env.SERVER_PORT;

  const runtimeEnvironment: string = process.env.rtenv || 'development';
  logger.log(`Runtime env. = ${runtimeEnvironment}`);
  logger.log(`  --> Server listens to port ${serverPort}`);

  if (
    process.env.SWAGGER_ENABLED ||
    runtimeEnvironment === 'development'
  ) {
    createSwagger(app);
  }

  app.use(bodyParser.json());
  app.use(helmet());

  await app.listenAsync(serverPort as string);
  logger.log(`API is listening on port ${serverPort}`);
}

function createSwagger(app: INestApplication) {
  const version = pkg.version || 'n/a';
  const config = new DocumentBuilder()
    .setTitle('App API')
    .setDescription(pkg.description)
    .setVersion(version)
    .addTag(pkg.name)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap().catch((err) => console.error(err));
