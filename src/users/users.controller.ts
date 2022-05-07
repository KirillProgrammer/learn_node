import { Request, Response,NextFunction } from 'express'
import { BaseController } from "../common/base.controller";
import { HTTPError } from '../errors/http-error.class';
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger)
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ])
    logger.log('UserController started')
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'Authentication error', 'login'))
    // this.ok(res, 'login')
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
  }
}