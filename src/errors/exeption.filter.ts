import { Request, Response, NextFunction } from 'express'
import { LoggerService } from '../logger/logger.service'
import { IExeptionFilter } from './exeption.filter.interface'
import { HTTPError } from './http-error.class'

export class ExeptionFilter implements IExeptionFilter {
  constructor(public logger: LoggerService) {
    logger.log('ExeptionFilter started')
  }
  
  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if(err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode} : ${err.message}`)
      res.status(err.statusCode).send({ err: err.message })
    } else {
      this.logger.error(`${err.message}`)
      res.status(500).send({ err: err.message })
    }
  }
}