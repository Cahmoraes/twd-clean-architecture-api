import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { badRequest, created } from '@/web-controllers/util'
import { MissingParamError } from '@test/web-controllers/errors/missing-param-error'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (!(request.body.name) || !(request.body.email)) {
      let missingParameter = !(request.body.name) ? 'name ' : ''
      missingParameter += !(request.body.email) ? 'email' : ''
      return badRequest(new MissingParamError(missingParameter.trim()))
    }

    const userData: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
