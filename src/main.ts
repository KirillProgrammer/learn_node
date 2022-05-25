import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { ILogger } from './logger/logger.interface'
import { UserController } from './users/users.controller'
import { ExeptionFilter } from './errors/exeption.filter'
import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { jsLoggerService } from './logger/otherLogger.service'
import { IUserService } from './users/user.service.interface'
import { IUserController } from './users/user.controller.interface'
import { UserService } from './users/user.service'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { UsersRepository } from './users/users.repository'
import { IUsersRepository } from './users/users.repository.interface'

export interface IBootstrapReturn {
	app: App
	appContainer: Container
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope()
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope()
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope()
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
	bind<App>(TYPES.Application).to(App).inSingletonScope()
})

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.Application)
	await app.init()
	return { app, appContainer }
}

export const boot = bootstrap()
