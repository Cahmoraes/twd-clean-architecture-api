import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { RegisterUserController } from '@/web-controllers'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMailingList = new RegisterUserOnMailingList(inMemoryUserRepository)
  const registerUserController = new RegisterUserController(registerUserOnMailingList)

  return registerUserController
}
