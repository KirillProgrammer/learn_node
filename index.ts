import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './users/users';

const port = 8000;
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time', Date.now());
})

app.get('/hello', (req: Request, res: Response) => {
  throw new Error('Errrrr')
})

app.use('/users', userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(401).send(err.message);
})

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
})