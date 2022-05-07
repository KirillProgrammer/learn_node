import express, {Express} from 'express'
import { Server } from 'http'
import { ExeptionFilter } from './errors/exeption.filter'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'

export class App {
  app: Express
  server: Server
  port: number

  constructor(
    public logger: LoggerService,
    public userController: UserController,
    public exeptionFilter: ExeptionFilter
    ) {
    this.app = express()
    this.port = 8000
    logger.log('App started')
  }

  useRoutes() {
    this.app.use('/users', this.userController.router)
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
  }

  public async init() {
    this.useRoutes()
    this.useExeptionFilters()
    this.server = this.app.listen(this.port)
    this.logger.log(`Server on http://localhost:${this.port}`)
  }
}