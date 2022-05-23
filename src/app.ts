import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { json } from 'body-parser'
import { IConfigService } from './config/config.service.interface'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { UserController } from './users/users.controller'
import 'reflect-metadata'

@injectable()
export class App {
	app: Express
	server: Server
	port: number

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express()
		this.port = 8000
		logger.log('App started')
	}

	useMiddleware(): void {
		this.app.use(json())
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router)
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init(): Promise<void> {
		this.useMiddleware()
		this.useRoutes()
		this.useExeptionFilters()
		this.server = this.app.listen(this.port)
		this.logger.log(`Server on http://localhost:${this.port}`)
	}
}
