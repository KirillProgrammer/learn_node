import { injectable } from 'inversify'
import { ILogger } from './logger.interface'
import { getLogger, Logger } from 'log4js'
import 'reflect-metadata'

@injectable()
export class jsLoggerService implements ILogger {
	public logger: Logger
	constructor() {
		this.logger = getLogger()
	}

	log(...args: unknown[]): void {
		this.logger.level = 'info'
		this.logger.info(args)
	}

	error(...args: unknown[]): void {
		this.logger.level = 'error'
		this.logger.error(args)
	}

	warn(...args: unknown[]): void {
		this.logger.level = 'warning'
		this.logger.warn(args)
	}
}
