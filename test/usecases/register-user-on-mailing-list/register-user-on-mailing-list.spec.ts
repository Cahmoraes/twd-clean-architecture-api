import { UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await useCase.perform({ name, email })
    const user = await repo.findUserByEmail('any@email.com')

    expect(user.name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid e-mail to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'
    const response = (await useCase.perform({ name, email: invalidEmail })).value as Error
    const user = await repo.findUserByEmail('any@email.com')

    expect(user).toBeNull()
    console.log(response.message)
    expect(response.name).toBe('InvalidEmailError')
  })

  test('should not add user with invalid name', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const validEmail = 'any@mail.com'
    const response = (await useCase.perform({ name: invalidName, email: validEmail })).value
    const user = await repo.findUserByEmail('any@email.com')

    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
