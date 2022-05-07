import { App } from "./app"
import { LoggerService } from "./logger/logger.service"
import { UserController } from "./users/users.controller"

const bootsrap = async () => {
  const logger         = new LoggerService(),
        userController = new UserController(logger)
  const app = new App(logger, userController)
  await app.init()
} 

bootsrap();