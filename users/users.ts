import express, { Request, Response, NextFunction } from "express";

const userRouter = express.Router();

userRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Обработчик users');
  next();
});

userRouter.post('/login', (req: Request, res: Response) => {
  res.send('login');
});

userRouter.post('/register', (req: Request, res: Response) => {
  res.send('register');
});

export { userRouter };