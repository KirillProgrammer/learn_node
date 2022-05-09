import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { ILogger } from './logger/logger.interface'
import { UserController } from './users/users.controller'
import { ExeptionFilter } from './errors/exeption.filter'
import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { jsLoggerService } from './logger/otherLogger.service'

export interface IBootstrapReturn {
	app: App
	appContainer: Container
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService)
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
	bind<UserController>(TYPES.UserController).to(UserController)
	bind<App>(TYPES.Application).to(App)
})

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.Application)
	app.init()
	return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
