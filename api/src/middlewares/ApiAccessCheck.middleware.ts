import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiAccessCheck implements NestMiddleware {
  private logger = new Logger('ApiBackOfficeAccessCheck');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug('API access check');

    const isRoutePathAccessAllowed =
      process.env.API_KEY &&
      process.env.API_KEY === req.headers['api-key'];

    if (isRoutePathAccessAllowed) {
      next();
    } else {
      try {
        throw new UnauthorizedException();
      } catch (error) {
        this.logger.error('API key on error', error);
        next(error);
      }
    }
  }
}
