import { App } from "./app"
import { LoggerService } from "./logger/logger.service"
import { UserController } from "./users/users.controller"
import { ExeptionFilter } from "./errors/exeption.filter"

const bootsrap = async () => {
  const logger         = new LoggerService(),
        userController = new UserController(logger),
        exeptionFilter = new ExeptionFilter(logger)
  const app = new App(logger, userController, exeptionFilter)
  await app.init()
} 

bootsrap();