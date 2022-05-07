import { App } from "./app"
import { LoggerService } from "./logger/logger.service";

const bootsrap = async () => {
  const app = new App(new LoggerService())
  await app.init()
} 

bootsrap();