import { Request, Response, NextFunction, Router } from 'express'
import { IMiddleware } from './middleware.interface'

export interface IContorollerRoute {
	path: string
	func: (req: Request, res: Response, next: NextFunction) => void
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
	middlewares?: IMiddleware[]
}

export type ExpressReturnType = Response<any, Record<string, any>>
