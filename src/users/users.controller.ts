import { Request, Response,NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from "../common/base.controller"
import { HTTPError } from '../errors/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import 'reflect-metadata'
import { IUserController } from './user.controller.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService)
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ])
    loggerService.log('UserController started')
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'Authentication error', 'login'))
    // this.ok(res, 'login')
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
  }
}