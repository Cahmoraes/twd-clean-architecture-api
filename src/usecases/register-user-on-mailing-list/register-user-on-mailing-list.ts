import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { User, UserData } from '@/entities'
import { Either, left, right } from '@/shared'
import { UserRepository } from '@/usecases/ports'

export class RegisterUserOnMailingList {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  async registerUserOnMailingList (request: UserData): Promise<Either<InvalidEmailError | InvalidNameError, UserData>> {
    const userOrError: Either<InvalidEmailError | InvalidNameError, User> = User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepo.exists(request))) {
      await this.userRepo.add(request)
    }

    return right(request)
  }
}
