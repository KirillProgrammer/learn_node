import 'reflect-metadata'
import { UserModel } from '@prisma/client'
import { Container } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../types'
import { User } from './user.entity'
import { UserService } from './user.service'
import { IUserService } from './user.service.interface'
import { IUsersRepository } from './users.repository.interface'

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
}
const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
}

const container = new Container()
let configService: IConfigService
let usersRepository: IUsersRepository
let usersService: IUserService

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService)
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock)
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock)

	configService = container.get<IConfigService>(TYPES.ConfigService)
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository)
	usersService = container.get<IUserService>(TYPES.UserService)
})

let createdUser: UserModel | null

describe('UserService', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1')
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		)
		createdUser = await usersService.createUser({
			email: 'user@example.com',
			password: 'password',
			name: 'user',
		})
		expect(createdUser?.id).toEqual(1)
		expect(createdUser?.password).not.toEqual('password')
	})
	it('validate user - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser)
		const result = await usersService.validateUser({
			email: 'user@example.com',
			password: 'password',
		})
		expect(result).toBeTruthy()
	})
	it('validate user - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser)
		const result = await usersService.validateUser({
			email: 'user@example.com',
			password: 'wrong_password',
		})
		expect(result).toBeFalsy()
	})
	it('validate user - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null)
		const result = await usersService.validateUser({
			email: 'user@example.com',
			password: 'wrong_password',
		})
		expect(result).toBeFalsy()
	})
})
